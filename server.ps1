$ErrorActionPreference = 'Stop'

try {
    # Keep both launcher files inside Goldenplus-Website.
    Set-Location -LiteralPath $PSScriptRoot
    $siteRoot = $PSScriptRoot
    $appRoot = Split-Path -Parent $siteRoot
    $python = Join-Path $appRoot 'tools\python\python.exe'
    $indexPath = Join-Path $siteRoot 'index.html'
    $newsPath = Join-Path $siteRoot 'data\news.json'

    if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) { throw "index.html not found: $indexPath" }
    if (-not (Test-Path -LiteralPath $newsPath -PathType Leaf)) { throw "data/news.json not found: $newsPath" }
    if (-not (Test-Path -LiteralPath $python -PathType Leaf)) { throw "Bundled Python not found: $python" }

    $portInput = Read-Host 'Preview port [Enter = 8000]'
    $port = 8000
    if (-not [string]::IsNullOrWhiteSpace($portInput)) {
        $parsedPort = 0
        if (-not [int]::TryParse($portInput.Trim(), [ref]$parsedPort)) { throw 'Port must be numeric and between 1 and 65535.' }
        if ($parsedPort -lt 1 -or $parsedPort -gt 65535) { throw 'Port must be between 1 and 65535.' }
        $port = $parsedPort
    }

    Write-Host "Website folder: $siteRoot" -ForegroundColor Cyan
    Write-Host "Python: $python" -ForegroundColor Cyan
    Write-Host "Home: http://127.0.0.1:$port/" -ForegroundColor Green
    Write-Host "News: http://127.0.0.1:$port/news.html" -ForegroundColor Green
    Write-Host 'Press Ctrl+C to stop the server.' -ForegroundColor Yellow

    & $python -m http.server $port --bind 127.0.0.1 --directory $siteRoot
    exit $LASTEXITCODE
} catch {
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
