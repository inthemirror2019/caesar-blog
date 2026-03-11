@echo off
echo ======================================
echo 正在部署 Caesar's Blog...
echo ======================================

cd /d "%~dp0"

echo 1. 拉取最新代码...
git pull origin main

echo.
echo 2. 构建静态页面...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo.
echo 3. 部署到 GitHub Pages...
call npx gh-pages -d docs/.vitepress/dist -b gh-pages
if %errorlevel% neq 0 (
    echo ❌ 部署失败！
    pause
    exit /b 1
)

echo.
echo ======================================
echo ✅ 部署成功！
echo 访问地址：https://inthemirror2019.github.io/caesar-blog/
echo ======================================
pause
