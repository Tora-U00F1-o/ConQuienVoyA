@echo off
py "%~dp0js\magic\prepareAuto.py"
if errorlevel 1 goto :error
py "%~dp0js\magic\prepareSchedule.py"
if errorlevel 1 goto :error
echo.
echo Matrículas y planificación actualizadas correctamente.
pause
exit /b 0

:error
echo.
echo La actualización ha fallado; revisa el mensaje anterior.
pause
exit /b 1
