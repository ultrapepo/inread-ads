#Requires -Version 5.1
param(
 [Parameter(Mandatory=$true)][string]$ZipPath,
 [Parameter(Mandatory=$true)][ValidatePattern('^[a-f0-9]{64}$')][string]$ExpectedManifestSha256
)
# Preparation oracle using the Windows .NET ZIP reader, independent of Node's
# custom ZIP writer. Extracts to a new Temp directory; never starts Chrome.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead((Resolve-Path -LiteralPath $ZipPath).Path)
$dest = Join-Path ([System.IO.Path]::GetTempPath()) ('gexp-recovery-verify-' + [guid]::NewGuid().ToString('N'))
[void][System.IO.Directory]::CreateDirectory($dest)
$names = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
try {
 foreach ($entry in $archive.Entries) {
  $name = $entry.FullName
  if ($name -notmatch '^[A-Za-z0-9._/-]+$' -or [IO.Path]::IsPathRooted($name) -or -not $names.Add($name)) { throw 'Unsafe or duplicate ZIP entry' }
  foreach ($part in $name.Split('/')) { if (!$part -or $part -eq '.' -or $part -eq '..' -or $part.EndsWith('.') -or $part -match '^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)') { throw 'Unsafe ZIP path component' } }
  if ((($entry.ExternalAttributes -shr 16) -band 61440) -eq 40960) { throw 'ZIP symlink' }
  $target = [IO.Path]::GetFullPath((Join-Path $dest $name.Replace('/', [IO.Path]::DirectorySeparatorChar)))
  if (!$target.StartsWith($dest + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'ZIP traversal' }
  [void][IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target))
  [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $false)
 }
} finally { $archive.Dispose() }
$manifestPath = Join-Path $dest 'package-manifest.json'
if ((Get-FileHash -LiteralPath $manifestPath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $ExpectedManifestSha256) { throw 'Manifest root mismatch' }
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
if ($manifest.files.Count + 1 -ne $names.Count) { throw 'ZIP inventory mismatch' }
foreach ($row in $manifest.files) {
 $file = Join-Path $dest $row.file
 if (-not $names.Contains($row.file) -or (Get-Item -LiteralPath $file).Length -ne $row.bytes -or (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $row.sha256) { throw ('Entry hash mismatch: ' + $row.file) }
}
$out = Join-Path ([IO.Path]::GetTempPath()) ('gexp-recovery-preflight-' + [guid]::NewGuid().ToString('N'))
& node (Join-Path $dest 'runner.cjs') preflight --expected-manifest $ExpectedManifestSha256 --out $out
if ($LASTEXITCODE -ne 0) { throw 'Extracted portable preflight failed' }
[pscustomobject]@{status='PASS-ZIP-EXTRACTION-AND-BYTES';entries=$names.Count;manifestSHA256=$ExpectedManifestSha256;extractedTo=$dest;preflightLogs=$out;ChromeLaunched=$false} | ConvertTo-Json -Compress
