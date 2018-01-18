SETCONSOLE /minimize
@echo off
cd %~dp0
start "" http://localhost:8080
start pythonw main.py
