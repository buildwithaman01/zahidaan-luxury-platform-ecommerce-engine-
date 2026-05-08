# 07 · AGENT DEVOPS
## FTP Deploy · Cloudflare · GitHub Actions · SSL

> Read `00_MASTER_PLAN.md` first.
> MilesWeb = static file server only. No Node, no Docker, no PM2.
> .git NEVER goes on MilesWeb. Build locally, upload /out only.

---

## DEPLOYMENT MODEL

```
Developer Machine (local)
  ↓ git push main
GitHub Repository
  ↓ GitHub Actions triggers
  ├── npm ci
  ├── npm run build (generates /out)
  └── FTP upload /out → MilesWeb public_html/
      + upload api.php, webhook.php, mail.php

MilesWeb (serves static files + PHP)
  ↓ Cloudflare CDN sits in front
  ↓ Cloudflare handles SSL (HTTPS)
  ↓ Cloudflare caches static assets (CSS, JS, images)
  ↓ Cloudflare passes through PHP calls (/api.php) uncached
```

---

## GITHUB ACTIONS — CI/CD PIPELINE

### `.github/workflows/deploy.yml`

```yaml
name: Build and Deploy ZAHIDAAN

on:
  push:
    branches: [main]
  repository_dispatch:
    types: [sanity-content-update]   # Triggered by webhook.php when Sanity changes

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: frontend
        run: npm ci

      - name: Build static export
        working-directory: frontend
        env:
          NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.SANITY_PROJECT_ID }}
          NEXT_PUBLIC_SANITY_DATASET: production
          NEXT_PUBLIC_SANITY_API_VERSION: 2024-01-01
          NEXT_PUBLIC_API_BASE: https://zahidaan.in
          NEXT_PUBLIC_PHONEPAY_UPI_ID: ${{ secrets.PHONEPAY_UPI_ID }}
          NEXT_PUBLIC_WHATSAPP_NUMBER: ${{ secrets.WHATSAPP_NUMBER }}
        run: npm run build

      - name: Deploy static files via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: frontend/out/
          server-dir: public_html/
          exclude: |
            **/.git*
            **/node_modules/**
            **/.env*

      - name: Deploy PHP backend files
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: backend/
          server-dir: public_html/
```

### GitHub Secrets to Configure

Go to: GitHub repo → Settings → Secrets and variables → Actions

| Secret Name | Value |
|---|---|
| `FTP_SERVER` | MilesWeb FTP hostname (e.g. `ftp.zahidaan.in`) |
| `FTP_USERNAME` | MilesWeb cPanel FTP username |
| `FTP_PASSWORD` | MilesWeb FTP password |
| `SANITY_PROJECT_ID` | From sanity.io dashboard |
| `PHONEPAY_UPI_ID` | e.g. `zahidaan@ybl` |
| `WHATSAPP_NUMBER` | e.g. `919XXXXXXXXX` |

---

## CLOUDFLARE SETUP

### Why Cloudflare (Free Plan)
- SSL/HTTPS without buying a certificate
- CDN caches static assets globally (faster loads in Delhi, Mumbai, Bangalore)
- DDoS protection
- Page rules for cache control

### Setup Steps
1. Create free Cloudflare account
2. Add site: `zahidaan.in`
3. Cloudflare provides two nameservers → update at domain registrar
4. SSL/TLS mode: set to **Full (strict)** — requires MilesWeb to also have SSL
5. MilesWeb: enable AutoSSL in cPanel (free Let's Encrypt cert)

### Cloudflare Page Rules / Cache Rules

| URL Pattern | Cache Rule |
|---|---|
| `zahidaan.in/_next/static/*` | Cache Everything · Edge TTL 1 year |
| `zahidaan.in/*.js` | Cache Everything · Edge TTL 1 month |
| `zahidaan.in/*.css` | Cache Everything · Edge TTL 1 month |
| `zahidaan.in/api.php*` | Bypass Cache (always fresh) |
| `zahidaan.in/webhook.php*` | Bypass Cache |
| `zahidaan.in/*.html` | Cache Everything · Edge TTL 1 hour |

### Cloudflare Security Settings
- Security Level: Medium
- Bot Fight Mode: ON
- Always Use HTTPS: ON
- HSTS: Enable (max-age 6 months to start)

---

## MANUAL FTP DEPLOY (Fallback if GitHub Actions not ready)

Use FileZilla or WinSCP:

```
Host:     ftp.zahidaan.in (or MilesWeb FTP host)
Username: [MilesWeb cPanel username]
Password: [cPanel password]
Port:     21 (FTP) or 22 (SFTP — prefer this)

Upload:
  Local:  frontend/out/*
  Remote: /public_html/

Upload:
  Local:  backend/api.php, webhook.php, mail.php
  Remote: /public_html/
```

**NEVER upload:**
- `node_modules/`
- `.next/`
- `.git/`
- `.env.local`
- `sanity-studio/`

---

## HEALTH CHECK ENDPOINT

Add to `api.php`:
```php
if (($_GET['action'] ?? '') === 'health') {
    echo json_encode([
        'status' => 'ok',
        'service' => 'ZAHIDAAN API',
        'db' => checkDBConnection() ? 'connected' : 'error',
        'timestamp' => date('c')
    ]);
    exit;
}
```

Test after every deploy: `https://zahidaan.in/api.php?action=health`

---

## MILWSWEB .htaccess (in public_html/)

```apache
# Redirect all non-file requests to index.html (Next.js static routing)
Options -MultiViews
RewriteEngine On

# Handle PHP files directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Next.js trailing slash routing
RewriteRule ^([^.]+)/?$ $1/index.html [L]

# Security headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Deny access to sensitive files
<FilesMatch "\.(env|log|sql|sh|json)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Deny access to logs folder
<IfModule mod_rewrite.c>
    RewriteRule ^logs/ - [F,L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|webp|svg|ico|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

---

## INODE AUDIT (Run before every deploy)

```bash
# Count inodes in the /out folder before uploading
find frontend/out -type f | wc -l
```

Target: under 250 files in `/out`. If over 300, investigate and prune.

Common causes of inode bloat:
- Too many dynamically generated pages (reduce if product count is low)
- Large number of blog posts (defer blog until Phase 2 if needed)
- Multiple font files (preload only used weights)
