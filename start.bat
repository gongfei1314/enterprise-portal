@echo off
chcp 65001 >nul
echo ====================================
echo 企业统一门户系统 - 启动脚本
echo ====================================
echo.

echo [1/3] 检查 Node.js 环境...
node --version
if %errorlevel% neq 0 (
    echo 错误：未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
echo ✓ Node.js 环境正常
echo.

echo [2/3] 检查依赖安装...
if not exist "node_modules\" (
    echo 正在安装项目依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo 错误：依赖安装失败
        pause
        exit /b 1
    )
    echo ✓ 依赖安装完成
) else (
    echo ✓ 依赖已安装
)
echo.

echo [3/3] 启动开发服务器...
echo ====================================
echo 前端服务: http://localhost:3000
echo 后端服务需要单独启动：
echo   - auth-service: http://localhost:8081
echo   - gateway-service: http://localhost:8080
echo ====================================
echo.

call npm run dev

pause
