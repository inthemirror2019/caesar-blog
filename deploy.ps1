Write-Host "======================================" -ForegroundColor Cyan
Write-Host "正在部署 Caesar's Blog..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

Set-Location $PSScriptRoot

Write-Host "`n1. 拉取最新代码..." -ForegroundColor Yellow
git pull origin main

Write-Host "`n2. 构建静态页面..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ 构建失败！" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit 1
}

Write-Host "`n3. 部署到 GitHub Pages..." -ForegroundColor Yellow
npx gh-pages -d docs/.vitepress/dist -b gh-pages
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ 部署失败！" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit 1
}

Write-Host "`n======================================" -ForegroundColor Green
Write-Host "✅ 部署成功！" -ForegroundColor Green
Write-Host "访问地址：https://inthemirror2019.github.io/caesar-blog/" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

Read-Host "`n按任意键退出"
