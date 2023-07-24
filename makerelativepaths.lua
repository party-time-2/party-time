function Image (img)
    local currentPath = os.getenv("PWD")
    local prevImageSrc = img.src
    local pathToRoot = pandoc.path.make_relative(currentPath, pandoc.system.get_working_directory(), true)
    local newPath = pandoc.path.join({currentPath, string.sub(prevImageSrc, 2)})
    img.src = newPath
    return img
end