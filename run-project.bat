@echo off
echo ===============================================================
echo  HealthPulse - Health Awareness & Wellness Management Portal
echo  Public Health & Citizen Wellness System
echo ===============================================================
echo.

echo Starting Backend Server on port 5000...
start cmd /k "cd backend && npm install && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Web App on port 5173...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Both servers are launching!
echo Backend API: http://localhost:5000/api
echo Frontend: http://localhost:5173
echo.
pause
