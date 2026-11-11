$lines = Get-Content 'index.html'
$inHeader = $false
$inFooter = $false
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    if ($line -match '<header') { $inHeader = $true }
    if ($line -match '</header>') { $inHeader = $false }
    if ($line -match '<footer') { $inFooter = $true }
    if ($line -match '</footer>') { $inFooter = $false }
    
    if (-not $inHeader -and -not $inFooter -and $i -gt 135) {
        if ($line -match '<a\s+[^>]*href=["''](?<href>[^"'']*)["'']') {
            Write-Output "Line $($i+1): $($Matches['href']) | $($line.Trim())"
        }
    }
}
