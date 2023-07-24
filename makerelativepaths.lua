function Image (img)
    local prevImageSrc = img.src
    local newPath = pandoc.path.join({pandoc.system.get_working_directory(), string.sub(prevImageSrc, 2)})
    --print(newPath)
    img.src = newPath
    return img
end