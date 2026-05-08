#!/bin/bash

# ZAHIDAAN Manual Deploy Script
# This script builds the frontend and prepares files for manual FTP upload.

echo "🌿 Starting ZAHIDAAN Manual Build..."

# 1. Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

if [ ! -d "frontend/out" ]; then
    echo "❌ Build failed! /out directory not found."
    exit 1
fi

echo "✅ Build Successful!"
echo ""
echo "--- DEPLOYMENT INSTRUCTIONS ---"
echo "1. Open your FTP client (FileZilla / WinSCP)."
echo "2. Connect to MilesWeb public_html/."
echo "3. Upload ALL contents of 'frontend/out/' to 'public_html/'."
echo "4. Upload ALL contents of 'backend/' to 'public_html/'."
echo "5. Ensure '.htaccess' (from backend folder) is in the root of 'public_html/'."
echo ""
echo "💡 Pro-tip: Use 'lftp' for automated mirroring if installed:"
echo "lftp -u USER,PASS -e 'set ftp:ssl-allow no; mirror -R frontend/out/ public_html/; mirror -R backend/ public_html/; quit' ftp.zahidaan.in"
echo "-------------------------------"
