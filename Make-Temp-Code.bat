@echo off
setlocal
cd /d "%~dp0"
title Tujengane - make a temporary access code

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js is not installed. Install the LTS version from https://nodejs.org and try again.
  pause
  exit /b 1
)
if not exist ".env.local" (
  echo.
  echo  Run Run-Tujengane-Local.bat once first. It saves the secret key this needs.
  pause
  exit /b 1
)

echo.
echo  Which course?   1 = Analyst Pro     2 = Computer Literacy
set /p CHOICE= Type 1 or 2 and press Enter: 
if "%CHOICE%"=="1" set COURSE=analyst
if "%CHOICE%"=="2" set COURSE=literacy
if not defined COURSE (
  echo  Please type 1 or 2.
  pause
  exit /b 1
)
set /p HOURS= How many hours should the code last? [3]: 
if not defined HOURS set HOURS=3

node tools\make-temp-code.js %COURSE% %HOURS%
pause
