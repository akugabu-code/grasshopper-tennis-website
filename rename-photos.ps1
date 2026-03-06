# Rename event, member, hero, and tournament photos to sequential numbers
# Usage: Run this script in PowerShell

$eventsPath = "assets\images\events"
$membersPath = "assets\images\members"
$heroPath = "assets\images\hero"
$tournamentPath = "assets\images\tournament-bg"
$months = @("apr", "may", "jun", "jul", "aug", "sep", "oct", "dec", "feb", "mar")

Write-Host "Photos Rename Script" -ForegroundColor Cyan
Write-Host ""

# Process event photos
Write-Host "=== Event Photos ===" -ForegroundColor Magenta
foreach ($month in $months) {
    $folderPath = Join-Path $eventsPath $month
    
    if (Test-Path $folderPath) {
        $images = Get-ChildItem -Path "$folderPath\*" -Include *.jpg, *.jpeg, *.png, *.gif | Sort-Object Name
        
        if ($images.Count -eq 0) {
            Write-Host "[$month] No images found" -ForegroundColor Yellow
            continue
        }
        
        Write-Host "[$month] Processing $($images.Count) images..." -ForegroundColor Green
        
        # Step 1: Rename all files to temporary names
        $tempFiles = @()
        $counter = 1
        foreach ($image in $images) {
            $tempName = "temp_rename_$counter$($image.Extension)"
            $tempPath = Join-Path $folderPath $tempName
            Rename-Item -Path $image.FullName -NewName $tempName -Force
            $tempFiles += @{Path = $tempPath; Extension = $image.Extension; Index = $counter}
            $counter++
        }
        
        # Step 2: Rename temp files to final sequential names
        foreach ($temp in $tempFiles) {
            $finalName = "$($temp.Index)$($temp.Extension)"
            $finalPath = Join-Path $folderPath $finalName
            Rename-Item -Path $temp.Path -NewName $finalName -Force
            Write-Host "  -> $finalName" -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Host "=== Member Photos ===" -ForegroundColor Magenta

# Process member photos
if (Test-Path $membersPath) {
    $images = Get-ChildItem -Path "$membersPath\*" -Include *.jpg, *.jpeg, *.png, *.gif | Sort-Object Name
    
    if ($images.Count -eq 0) {
        Write-Host "[members] No images found" -ForegroundColor Yellow
    } else {
        Write-Host "[members] Processing $($images.Count) images..." -ForegroundColor Green
        
        # Step 1: Rename all files to temporary names
        $tempFiles = @()
        $counter = 1
        foreach ($image in $images) {
            $tempName = "temp_rename_$counter$($image.Extension)"
            $tempPath = Join-Path $membersPath $tempName
            Rename-Item -Path $image.FullName -NewName $tempName -Force
            $tempFiles += @{Path = $tempPath; Extension = $image.Extension; Index = $counter}
            $counter++
        }
        
        # Step 2: Rename temp files to final sequential names
        foreach ($temp in $tempFiles) {
            $finalName = "$($temp.Index)$($temp.Extension)"
            $finalPath = Join-Path $membersPath $finalName
            Rename-Item -Path $temp.Path -NewName $finalName -Force
            Write-Host "  -> $finalName" -ForegroundColor White
        }
    }
}

Write-Host ""
Write-Host "=== Hero Background ===" -ForegroundColor Magenta

# Process hero background photo (only first image)
if (Test-Path $heroPath) {
    $images = Get-ChildItem -Path "$heroPath\*" -Include *.jpg, *.jpeg, *.png, *.gif | Sort-Object Name
    
    if ($images.Count -eq 0) {
        Write-Host "[hero] No images found" -ForegroundColor Yellow
    } else {
        Write-Host "[hero] Processing first image as background..." -ForegroundColor Green
        
        $firstImage = $images[0]
        if ($firstImage.Name -ne "1$($firstImage.Extension)") {
            $newName = "1$($firstImage.Extension)"
            Rename-Item -Path $firstImage.FullName -NewName $newName -Force
            Write-Host "  -> $newName" -ForegroundColor White
        } else {
            Write-Host "  -> Already named correctly: 1$($firstImage.Extension)" -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "=== Tournament Background ===" -ForegroundColor Magenta

# Process tournament background photo (only first image)
if (Test-Path $tournamentPath) {
    $images = Get-ChildItem -Path "$tournamentPath\*" -Include *.jpg, *.jpeg, *.png, *.gif | Sort-Object Name
    
    if ($images.Count -eq 0) {
        Write-Host "[tournament-bg] No images found" -ForegroundColor Yellow
    } else {
        Write-Host "[tournament-bg] Processing first image as background..." -ForegroundColor Green
        
        $firstImage = $images[0]
        if ($firstImage.Name -ne "1$($firstImage.Extension)") {
            $newName = "1$($firstImage.Extension)"
            Rename-Item -Path $firstImage.FullName -NewName $newName -Force
            Write-Host "  -> $newName" -ForegroundColor White
        } else {
            Write-Host "  -> Already named correctly: 1$($firstImage.Extension)" -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "Done! Reload your browser with Ctrl+Shift+R to clear cache." -ForegroundColor Cyan
