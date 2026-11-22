param(
    [Parameter(Mandatory)][string]$WebView2Assemblies,
    [Parameter(Mandatory)][string]$WebView2Loader,
    [Parameter(Mandatory)][string]$Sortie
)
$ErrorActionPreference = 'Stop'
$src = $PSScriptRoot
$project = (Resolve-Path (Join-Path $src '..\..')).Path
$csc = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$output = [IO.Path]::GetFullPath($Sortie)
$stage = New-Item -ItemType Directory -Path (Join-Path ([IO.Path]::GetTempPath()) ('grindpoker-build-' + [guid]::NewGuid()))
[void][IO.Directory]::CreateDirectory($output)
foreach ($dll in 'Microsoft.Web.WebView2.Core.dll','Microsoft.Web.WebView2.WinForms.dll') {
    Copy-Item -LiteralPath (Join-Path $WebView2Assemblies $dll) -Destination $stage.FullName
}
Copy-Item -LiteralPath $WebView2Loader -Destination (Join-Path $stage 'WebView2Loader.dll')
Push-Location $stage
try {
    & $csc /nologo /target:winexe /platform:x64 /optimize+ /out:GrindPoker.exe "/win32icon:$project\desktop\icon.ico" "/resource:$project\index.html,index.html" "/resource:$project\logo.svg,logo.svg" /reference:System.Web.Extensions.dll /reference:System.Drawing.dll /reference:System.Windows.Forms.dll /reference:Microsoft.Web.WebView2.Core.dll /reference:Microsoft.Web.WebView2.WinForms.dll "$src\GrindPoker.cs"
    if ($LASTEXITCODE) {throw 'Compilation de GrindPoker impossible'}
    @('.OPTION EXPLICIT','.Set CabinetNameTemplate=payload.cab','.Set DiskDirectory1=.','.Set Cabinet=on','.Set Compress=on','.Set CompressionType=MSZIP','GrindPoker.exe AppFile','Microsoft.Web.WebView2.Core.dll CoreDll','Microsoft.Web.WebView2.WinForms.dll FormsDll','WebView2Loader.dll LoaderDll') | Set-Content -Encoding ascii paquet.ddf
    & makecab.exe /F paquet.ddf | Out-Null
    if ($LASTEXITCODE) {throw 'Création du cabinet impossible'}
    & $csc /nologo /target:exe /platform:x64 /out:FabriquerMsi.exe "$src\FabriquerMsi.cs"
    if ($LASTEXITCODE) {throw 'Compilation du constructeur MSI impossible'}
    & .\FabriquerMsi.exe GrindPoker.msi . payload.cab "$project\desktop\icon.ico"
    if ($LASTEXITCODE) {throw 'Création du MSI impossible'}
    & $csc /nologo /target:winexe /platform:anycpu /optimize+ /reference:System.Windows.Forms.dll "/win32icon:$project\desktop\icon.ico" "/win32manifest:$src\installation.manifest" /resource:GrindPoker.msi,GrindPoker.msi "/out:$output\GrindPoker-Installation-1.0.1.exe" "$src\Installer.cs"
    if ($LASTEXITCODE) {throw 'Création de cet installateur impossible'}
} finally {Pop-Location}

