#Requires -Version 5.1
param([Parameter(Mandatory=$true)][string]$ChromePath)
$ErrorActionPreference = 'Stop'
$item = Get-Item -LiteralPath $ChromePath
$item.VersionInfo | Select-Object ProductVersion, FileVersion, ProductName | ConvertTo-Json -Compress
