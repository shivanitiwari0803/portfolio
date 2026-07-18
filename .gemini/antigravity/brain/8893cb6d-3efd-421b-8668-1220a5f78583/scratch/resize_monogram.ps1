Add-Type -AssemblyName System.Drawing

$masterPath = "C:\Users\HP\.gemini\antigravity\brain\8893cb6d-3efd-421b-8668-1220a5f78583\logo_monogram_1784356663107.png"
$publicDir = "c:\Users\HP\OneDrive\Desktop\portfolio\public"

if (-not (Test-Path $masterPath)) {
    Write-Host "Error: Master image not found at $masterPath"
    exit 1
}

# Create output folder if it doesn't exist
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir -Force | Out-Null
}

# Load the master image and make the black background transparent
$srcBitmap = New-Object System.Drawing.Bitmap($masterPath)
$srcBitmap.MakeTransparent([System.Drawing.Color]::Black)

# Define sizes to generate
$sizes = @{
    "favicon-16.png" = @(16, 16)
    "favicon-32.png" = @(32, 32)
    "favicon-48.png" = @(48, 48)
    "apple-touch-icon.png" = @(180, 180)
    "icon-192.png" = @(192, 192)
    "icon-512.png" = @(512, 512)
}

foreach ($filename in $sizes.Keys) {
    $width = $sizes[$filename][0]
    $height = $sizes[$filename][1]
    
    $destBitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($destBitmap)
    
    # Set high-quality render settings
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    # Draw the resized transparent image
    $graphics.DrawImage($srcBitmap, 0, 0, $width, $height)
    
    # Clean up graphics
    $graphics.Dispose()
    
    # Save the file
    $outputPath = Join-Path $publicDir $filename
    $destBitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBitmap.Dispose()
    
    Write-Host "Generated: $filename ($width x $height)"
}

# Create standard favicon.ico (using 32x32 size)
$icoPath = Join-Path $publicDir "favicon.ico"
$src32 = New-Object System.Drawing.Bitmap(32, 32)
$graphics = [System.Drawing.Graphics]::FromImage($src32)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($srcBitmap, 0, 0, 32, 32)
$graphics.Dispose()

# Save 32x32 directly as favicon.ico (browsers support PNG in .ico extension)
$src32.Save($icoPath, [System.Drawing.Imaging.ImageFormat]::Icon)
$src32.Dispose()
Write-Host "Generated: favicon.ico (32x32)"

# Clean up srcBitmap
$srcBitmap.Dispose()
Write-Host "Icon generation completed successfully!"
