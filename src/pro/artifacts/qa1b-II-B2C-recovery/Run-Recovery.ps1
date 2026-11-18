#Requires -Version 5.1
[CmdletBinding()]
param(
  [ValidateSet('preflight','environment','g1g2')][string]$Mode = 'preflight',
  [Parameter(Mandatory=$true)][ValidatePattern('^[a-f0-9]{64}$')][string]$ExpectedManifestSha256,
  [Parameter(Mandatory=$true)][string]$OutputDirectory,
  [string]$ChromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe',
  [switch]$ConfirmLocalSession,
  [switch]$ResumeG1G2
)
$ErrorActionPreference = 'Stop'
if ($Mode -ne 'preflight' -and -not $ConfirmLocalSession) { throw 'Manual local authorized session confirmation required. No browser launched.' }
if ($Mode -eq 'g1g2' -and -not $ResumeG1G2) { throw 'Explicit -ResumeG1G2 required. No browser launched.' }
$node = (Get-Command node -ErrorAction Stop).Source
$arguments = @((Join-Path $PSScriptRoot 'runner.cjs'), $Mode, '--expected-manifest', $ExpectedManifestSha256, '--out', $OutputDirectory, '--chrome', $ChromePath)
if ($ConfirmLocalSession) { $arguments += '--operator-local' }
if ($ResumeG1G2) { $arguments += '--resume-g1g2' }
& $node @arguments
exit $LASTEXITCODE
