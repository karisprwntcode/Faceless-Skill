param(
    [string]$Format = "vertical"
)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Remotion Motion Graphics Render Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

if ($Format -eq "horizontal") {
    Write-Host "Rendering Horizontal 16:9 (1920x1080)..." -ForegroundColor Yellow
    npm.cmd run render:horizontal
} else {
    Write-Host "Rendering Vertical 9:16 (1080x1920)..." -ForegroundColor Yellow
    npm.cmd run render:vertical
}

Write-Host ""
Write-Host "Render Complete! Check out/ folder." -ForegroundColor Green

