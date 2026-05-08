# 11 · DEPLOYMENT GUIDE
## Dev → Staging → Production Step-by-Step

---

## PHASE 1: LOCAL DEVELOPMENT

```bash
# 1. Clone repo
git clone https://github.com/pehchanly/zahidaan.git
cd zahidaan/frontend

# 2. Install dependencies
npm install

# 3. Create .env.local with all variables

# 4. Run development server (not static — for development only)
npm run dev
# Opens at http://localhost:3000

# 5. Test order flow against local PHP (use XAMPP/Laragon for local PHP+MySQL)
```

## PHASE 2: PRE-DEPLOY BUILD TEST

```bash
cd frontend

# Build static export
npm run build

# Verify /out folder created
ls out/

# Count files (should be under 250)
find out -type f | wc -l

# Spot check critical files exist
ls out/index.html
ls out/shop/index.html
ls out/sitemap.xml
```

## PHASE 3: DATABASE SETUP ON MILWSWEB

1. Login to MilesWeb cPanel
2. MySQL Databases → Create `zahidaan_db`
3. Create user `zahidaan_user` with strong password
4. Assign All Privileges
5. phpMyAdmin → run `database/schema.sql`
6. Update api.php constants with credentials

## PHASE 4: FTP UPLOAD

Option A (GitHub Actions — preferred):
```
Push to main branch → Actions automatically builds and deploys
```

Option B (Manual FileZilla):
```
1. Connect to MilesWeb FTP
2. Upload frontend/out/* to public_html/
3. Upload backend/api.php to public_html/api.php
4. Upload backend/webhook.php to public_html/webhook.php
5. Upload backend/mail.php to public_html/mail.php
6. Upload .htaccess to public_html/.htaccess
```

## PHASE 5: CLOUDFLARE ACTIVATION

1. Add zahidaan.in to Cloudflare
2. Update nameservers at registrar
3. Wait 24–48 hours for propagation
4. Enable Always HTTPS
5. Set SSL to Full (strict)
6. Configure cache rules (see 07_AGENT_DEVOPS.md)

## PHASE 6: POST-DEPLOY VERIFICATION

```
✓ https://zahidaan.in loads with HTTPS
✓ https://zahidaan.in/api.php?action=health → {"status":"ok","db":"connected"}
✓ Place test order → owner email received
✓ Confirm order → customer email received
✓ Sanity webhook fires rebuild
✓ Google Search Console → submit sitemap
✓ GBP → verify NAP matches exactly
```

---

