Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("character_trans.png")
$bmp = New-Object System.Drawing.Bitmap $img
$width = $bmp.Width
$height = $bmp.Height
$left = $width
$right = 0
$top = $height
$bottom = 0

for ($x = 0; $x -lt $width; $x++) {
    for ($y = 0; $y -lt $height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 0) {
            if ($x -lt $left) { $left = $x }
            if ($x -gt $right) { $right = $x }
            if ($y -lt $top) { $top = $y }
            if ($y -gt $bottom) { $bottom = $y }
        }
    }
}

$cropRect = New-Object System.Drawing.Rectangle($left, $top, ($right - $left + 1), ($bottom - $top + 1))
$croppedBmp = $bmp.Clone($cropRect, $bmp.PixelFormat)
$croppedBmp.Save("character_cropped.png", [System.Drawing.Imaging.ImageFormat]::Png)

$croppedBmp.Dispose()
$bmp.Dispose()
$img.Dispose()
