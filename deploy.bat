@echo off
chcp 65001 >nul
echo ======================================
echo 正在部署 Caesar's Blog...
echo ======================================

cd /d "%~dp0"

echo 1. 提交本地修改...
git add .
git commit -m "Update blog content"

echo.
echo 2. 拉取最新代码...
git pull origin main --rebase

echo.
echo 3. 推送代码到远程仓库...
git push origin main

echo.
echo 4. 构建静态页面...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败！
    pause
    exit /b 1
)

echo.
echo 5. 部署到 GitHub Pages...
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
