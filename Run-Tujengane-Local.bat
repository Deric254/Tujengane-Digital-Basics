@echo off
setlocal
cd /d "%~dp0"
title Tujengane - running on this computer

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed on this computer.
  echo  1. Open https://nodejs.org  2. Download the LTS version  3. Install it  4. Run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\nodemailer" (
  echo.
  echo  First run: installing the small helper for the PayPal proof email (needs internet, about a minute; skipped if offline)...
  call npm install --omit=dev --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo  Could not install it - probably no internet. That is fine: everything works except the PayPal proof email.
    echo  Continuing without it...
  )
)

if not exist ".env.local" (
  node tools\setup-local.js
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

echo.
echo  Starting Tujengane...
node tools\local-server.js --open
echo.
echo  The server stopped. If this was not on purpose, read the message above.
pause
