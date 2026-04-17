Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("character.png")
$bmp = New-Object System.Drawing.Bitmap $img
$bmp.MakeTransparent([System.Drawing.Color]::White)
$bmp.Save("character_trans.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
