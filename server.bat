@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul

rem Use the script location regardless of the current working directory.
if not exist "%~dp0server.ps1" (
    echo [ERROR] Missing script: "%~dp0server.ps1"
    pause
    exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
set "RESULT=%ERRORLEVEL%"
echo.
if not "%RESULT%"=="0" echo [ERROR] Server exited with code %RESULT%.
pause
exit /b %RESULT%
