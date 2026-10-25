# Runs money-inpage.js inside hq/debug.html in headless Edge, once at desktop width and once at phone width, and prints
# the FAIL lines (and the summary) from <pre id="asserts"> plus anything in <pre id="errlog">.
# Run from the session folder:  powershell -NoProfile -File hq\tools\money-inpage.ps1
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path))
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$base = "file:///" + ((Resolve-Path (Join-Path $Root 'hq\debug.html')).Path -replace '\\','/')
$js = [IO.File]::ReadAllText((Join-Path $Root 'hq\tools\money-inpage.js'))
$jsq = [uri]::EscapeDataString($js)
$prof = Join-Path $env:TEMP ('hq-edge-inpage-' + $PID)
New-Item -ItemType Directory -Force $prof | Out-Null
$out = @()
foreach ($win in @('1280,900', '390,844')) {
  $p1 = Join-Path $prof ('p' + ($win -replace ',', 'x')); New-Item -ItemType Directory -Force $p1 | Out-Null
  $d1 = Join-Path $prof ('dom-' + ($win -replace ',', 'x') + '.txt')
  $u = $base + '?user=u-charly&screen=money&lang=en&script=' + $jsq
  cmd /c "`"$edge`" --headless=new --disable-gpu --allow-file-access-from-files --no-first-run --user-data-dir=`"$p1`" --window-size=$win --virtual-time-budget=6000 --dump-dom `"$u`" > `"$d1`" 2>nul"
  $txt = ''
  for ($try = 0; $try -lt 120; $try++) { try { if (Test-Path $d1) { $txt = [IO.File]::ReadAllText($d1) } } catch { $txt = '' }; if ($txt -match '</html>') { break }; Start-Sleep -Milliseconds 500 }
  $m = [regex]::Match($txt, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline'); $err = 'NO ERRLOG'; if ($m.Success) { $err = $m.Groups[1].Value.Trim() }
  $a = [regex]::Match($txt, '<pre id="asserts"[^>]*>(.*?)</pre>', 'Singleline'); $asserts = ''; if ($a.Success) { $asserts = $a.Groups[1].Value }
  $lines = $asserts -split "`n"
  $out += "== window $win  ready=" + ($txt -match 'data-ready="1"') + "  errlog=[" + ($err -replace "`n", ' || ') + "]"
  $out += ($lines | Where-Object { $_ -match '^FAIL' -or $_ -match 'SUMMARY' })
  $out += "   PASS lines: " + (($lines | Where-Object { $_ -match '^PASS' }).Count)
  try { Copy-Item $d1 (Join-Path $Root ('hq\dom-money-' + ($win -replace ',', 'x') + '.txt')) -Force } catch {}
}
$out | Out-File -Encoding utf8 (Join-Path $Root 'hq\money-inpage.txt')
Start-Sleep -Seconds 2
Remove-Item -Recurse -Force $prof -ErrorAction SilentlyContinue
$out
