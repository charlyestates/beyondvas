param([string]$Tag = 'desk')
Add-Type -AssemblyName System.Web
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$files = Get-ChildItem (Join-Path $root "dom-errscan-$Tag-*.txt")
$vaSur = 'Castellanos|Andino|Molina|Paz\b|Herrera|Mejía|Mejia|Ortiz'
$payRates = '\$6\.50|\$5\.00|\$5\.50|\$6\.00|Pay rate|Tarifa del VA|\$6/h|\$5/h|\$6\.5/h|\$5\.5/h'
$billRates = '\$12/h|\$10/h|\$8/h|\$960|\$480|\$800|BV-\d{4}'
$applicants = 'Sofía|Sofia Lagos|Lagos|Diego Fuentes|Fuentes|Valeria|Núñez|Marco Pineda|Pineda|Camila Rivas|Rivas|Zelaya|Mendieta|Ochoa'
$threadTitles = 'Pay statement question|estado de pago|Morning start times|Horario de entrada|Headset and internet|Diadema|Bench period and first|Periodo en banca'
$clients = @{ 'c-rodriguez' = 'Rodriguez'; 'c-lonestar' = 'Lone Star'; 'c-sunshine' = 'Sunshine' }
$userClient = @{ 'u-ana' = 'c-rodriguez'; 'u-mike' = 'c-lonestar'; 'u-priya' = 'c-sunshine' }
function ctx($txt, $pat) { $ms = [regex]::Matches($txt, $pat); $o = @(); foreach ($m in $ms) { $a = [Math]::Max(0, $m.Index - 45); $l = [Math]::Min($txt.Length - $a, $m.Length + 90); $o += ('…' + ($txt.Substring($a, $l) -replace "\s+", ' ') + '…') }; ($o | Select-Object -Unique -First 3) -join ' || ' }
foreach ($f in $files) {
  $dom = [IO.File]::ReadAllText($f.FullName)
  if ($f.Name -notmatch "dom-errscan-$Tag-(.+)-(en|es)\.txt$") { continue }
  $u = $Matches[1]; $lang = $Matches[2]
  $m = [regex]::Match($dom, '<pre id="errlog"[^>]*>(.*?)</pre>', 'Singleline'); $err = [System.Web.HttpUtility]::HtmlDecode($m.Groups[1].Value).Trim()
  $a = [regex]::Match($dom, '<pre id="asserts"[^>]*>(.*?)</pre>', 'Singleline'); $lines = [System.Web.HttpUtility]::HtmlDecode($a.Groups[1].Value) -split "`n"
  if (-not $lines -or $lines.Count -lt 2) { "## $u $lang : NO ASSERT OUTPUT. errlog=$err"; continue }
  $nav = $lines[0] | ConvertFrom-Json
  "## $u $lang (role $($nav.role), nav+more: $($nav.nav -join ','))"
  if ($err) { "   BOOT ERRLOG: $err" }
  foreach ($ln in $lines[1..($lines.Count - 1)]) {
    if (-not $ln.Trim()) { continue }
    try { $r = $ln | ConvertFrom-Json } catch { "   BAD JSON LINE: $($ln.Substring(0, [Math]::Min(120, $ln.Length)))"; continue }
    $key = "$($r.s)" + $(if ($r.id) { "/$($r.id)" } else { '' })
    $t = $r.txt
    if ($r.errs.Count) { "   [$key] ERRORS: $($r.errs -join ' ;; ')" }
    if ($r.esc) { "   [$key] ESCAPED HTML: $($r.esc)" }
    if ($t -match '\{(date|d|n|a|v|t|s|name|b|x|y|k|h)\}') { "   [$key] PLACEHOLDER: $(ctx $t '\{(date|d|n|a|v|t|s|name|b|x|y|k|h)\}')" }
    if ($t -match 'not in the prototype yet|aún no está en el prototipo|not in the prototype|no está en el prototipo') { $should = $nav.nav -contains $r.s; "   [$key] NOTINPROTO (role should have: $should): $(ctx $t 'not in the prototype|no está en el prototipo')" }
    if ($t -match '\bundefined\b|\bNaN\b|\bnull\b|\[object Object\]') { "   [$key] UNDEF/NaN: $(ctx $t '\bundefined\b|\bNaN\b|\bnull\b|\[object Object\]')" }
    if ($t -match 'Error|Something went wrong|Algo salió mal') { if ($t -match 'Error\b(?! log)') { "   [$key] ERROR-TEXT: $(ctx $t 'Error|Something went wrong|Algo salió mal')" } }
    if ($userClient.ContainsKey($u)) {
      if ($t -match $vaSur) { "   [$key] PRIV client sees VA surname: $(ctx $t $vaSur)" }
      if ($t -match $payRates) { "   [$key] PRIV client sees pay rate: $(ctx $t $payRates)" }
      if ($t -match 'margin|margen') { "   [$key] PRIV client sees margin: $(ctx $t 'margin|margen')" }
      foreach ($c in $clients.Keys) { if ($c -ne $userClient[$u] -and $t -match $clients[$c]) { "   [$key] PRIV client sees other client $c : $(ctx $t $clients[$c])" } }
      if ($t -match $applicants) { "   [$key] PRIV client sees applicant: $(ctx $t $applicants)" }
      if ($t -match $threadTitles) { "   [$key] PRIV client sees support thread title: $(ctx $t $threadTitles)" }
    }
    if ($u -in @('u-mariela','u-jose','u-kevin','u-carlos')) {
      if ($t -match $billRates) { "   [$key] PRIV VA sees bill rate/block/invoice: $(ctx $t $billRates)" }
      if ($t -match 'margin|margen') { "   [$key] PRIV VA sees margin: $(ctx $t 'margin|margen')" }
    }
    if ($u -eq 'a-sofia') {
      if ($t -match $billRates -or $t -match $payRates) { "   [$key] PRIV applicant sees money: $(ctx $t ($billRates + '|' + $payRates))" }
      if ($t -match $vaSur) { "   [$key] PRIV applicant sees VA surname: $(ctx $t $vaSur)" }
    }
  }
}
