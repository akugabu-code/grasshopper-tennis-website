<#
.SYNOPSIS
    Image Compression Script - GrassHopper Tennis Website
    
.DESCRIPTION
    Automatically compress all images in assets/images folder
    - Supports JPG/JPEG/PNG formats
    - Adjustable quality and size
    - Creates backup of original images
    - Reports compression results
    
.EXAMPLE
    .\compress-images.ps1
    Compress all images with default settings
    
.EXAMPLE
    .\compress-images.ps1 -Quality 85 -MaxWidth 1920 -SkipBackup
    Compress with 85% quality, max width 1920px, no backup
#>

param(
    [int]$Quality = 80,              # JPEG quality (1-100)
    [int]$MaxWidth = 1600,           # Maximum width (pixels)
    [int]$MaxHeight = 1200,          # Maximum height (pixels)
    [switch]$SkipBackup,             # Skip backup creation
    [string]$TargetFolder = "assets\images" # Target folder
)

# Color output function
function Write-ColorOutput {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

# Load .NET types
Add-Type -AssemblyName System.Drawing

Write-ColorOutput "`n========================================" "Cyan"
Write-ColorOutput "  Image Compression - GrassHopper" "Cyan"
Write-ColorOutput "========================================`n" "Cyan"

Write-ColorOutput "Settings:" "Yellow"
Write-ColorOutput "  Quality: $Quality%" "White"
Write-ColorOutput "  Max Width: $MaxWidth px" "White"
Write-ColorOutput "  Max Height: $MaxHeight px" "White"
Write-ColorOutput "  Backup: $(if($SkipBackup){'No'}else{'Yes'})`n" "White"

# Check target folder
$targetPath = Join-Path $PSScriptRoot $TargetFolder
if (-not (Test-Path $targetPath)) {
    Write-ColorOutput "Error: Folder not found: $targetPath" "Red"
    exit 1
}

# Create backup folder
$backupFolder = Join-Path $PSScriptRoot "image_backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
if (-not $SkipBackup) {
    New-Item -ItemType Directory -Path $backupFolder -Force | Out-Null
    Write-ColorOutput "Backup folder created: $backupFolder`n" "Green"
}

# Get image files
$imageExtensions = @('*.jpg', '*.jpeg', '*.png')
$imageFiles = Get-ChildItem -Path $targetPath -Include $imageExtensions -Recurse -File

$totalFiles = $imageFiles.Count
$processedFiles = 0
$totalOriginalSize = 0
$totalCompressedSize = 0
$errorCount = 0

Write-ColorOutput "Target: $totalFiles image files`n" "Cyan"

# Process each image
foreach ($file in $imageFiles) {
    $processedFiles++
    $relativePath = $file.FullName.Replace($targetPath, "").TrimStart('\')
    
    Write-Progress -Activity "Compressing images..." -Status "$processedFiles / $totalFiles : $relativePath" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    try {
        # Original file size
        $originalSize = $file.Length
        $totalOriginalSize += $originalSize
        
        # Create backup
        if (-not $SkipBackup) {
            $backupPath = Join-Path $backupFolder $relativePath
            $backupDir = Split-Path $backupPath -Parent
            if (-not (Test-Path $backupDir)) {
                New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
            }
            Copy-Item $file.FullName -Destination $backupPath -Force
        }
        
        # Load image
        $image = [System.Drawing.Image]::FromFile($file.FullName)
        $originalWidth = $image.Width
        $originalHeight = $image.Height
        
        # Check if resize is needed
        $needResize = $originalWidth -gt $MaxWidth -or $originalHeight -gt $MaxHeight
        
        if ($needResize) {
            # Resize maintaining aspect ratio
            $ratioX = $MaxWidth / $originalWidth
            $ratioY = $MaxHeight / $originalHeight
            $ratio = [Math]::Min($ratioX, $ratioY)
            
            $newWidth = [int]($originalWidth * $ratio)
            $newHeight = [int]($originalHeight * $ratio)
        } else {
            $newWidth = $originalWidth
            $newHeight = $originalHeight
        }
        
        # Create new image
        $newBitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        
        # Set encoder parameters
        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $Quality)
        
        # Get JPEG encoder
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        
        # Close original image (release file lock)
        $graphics.Dispose()
        $image.Dispose()
        
        # Save to temp file
        $tempFile = [System.IO.Path]::GetTempFileName()
        $newBitmap.Save($tempFile, $jpegCodec, $encoderParams)
        $newBitmap.Dispose()
        
        # Replace original file (convert to .jpg extension)
        $newFileName = [System.IO.Path]::ChangeExtension($file.FullName, '.jpg')
        
        # Delete original if it was .png or .jpeg
        if ($file.FullName -ne $newFileName) {
            Remove-Item $file.FullName -Force
        }
        
        Move-Item $tempFile -Destination $newFileName -Force
        
        # Compressed file size
        $compressedSize = (Get-Item $newFileName).Length
        $totalCompressedSize += $compressedSize
        
        # Calculate reduction
        $reduction = if ($originalSize -gt 0) { [Math]::Round((1 - ($compressedSize / $originalSize)) * 100, 1) } else { 0 }
        $sizeChange = if ($needResize) { "$($originalWidth)x$originalHeight -> $($newWidth)x$newHeight" } else { "No resize" }
        
        $statusColor = if ($reduction -gt 50) { "Green" } elseif ($reduction -gt 20) { "Yellow" } else { "White" }
        Write-ColorOutput "  OK $relativePath" $statusColor
        Write-ColorOutput "    $([Math]::Round($originalSize/1KB, 1)) KB -> $([Math]::Round($compressedSize/1KB, 1)) KB (-$reduction%) | $sizeChange" "Gray"
        
    } catch {
        $errorCount++
        Write-ColorOutput "  ERROR: $relativePath - $($_.Exception.Message)" "Red"
    }
}

Write-Progress -Activity "Compressing images..." -Completed

# Results summary
$totalReduction = if ($totalOriginalSize -gt 0) { 
    [Math]::Round((1 - ($totalCompressedSize / $totalOriginalSize)) * 100, 1) 
} else { 0 }

Write-ColorOutput "`n========================================" "Cyan"
Write-ColorOutput "  Compression Complete" "Cyan"
Write-ColorOutput "========================================" "Cyan"
Write-ColorOutput "Processed: $processedFiles files" "Green"
Write-ColorOutput "Errors: $errorCount files" $(if($errorCount -gt 0){"Red"}else{"Green"})
Write-ColorOutput "Original size: $([Math]::Round($totalOriginalSize/1MB, 2)) MB" "White"
Write-ColorOutput "Compressed: $([Math]::Round($totalCompressedSize/1MB, 2)) MB" "White"
Write-ColorOutput "Saved: $([Math]::Round(($totalOriginalSize - $totalCompressedSize)/1MB, 2)) MB (-$totalReduction%)" "Green"

if (-not $SkipBackup) {
    Write-ColorOutput "`nBackup: $backupFolder" "Yellow"
}

Write-ColorOutput "`nDone!`n" "Cyan"
