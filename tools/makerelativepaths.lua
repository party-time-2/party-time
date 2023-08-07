function Image (img)
    local prevImageSrc = img.src
    local newPath = pandoc.path.join({pandoc.system.get_working_directory(), string.sub(prevImageSrc, 2)})
    --print(newPath)
    img.src = newPath
    return img
end

function Link (el)
    local prevLinkTarget = el.target
    if prevLinkTarget:sub(1, #"http") ~= "http" then
        local pwd = pandoc.system.get_working_directory()
        local inputFile = PANDOC_STATE.input_files[1]
        local mdDir = pandoc.path.join({pwd, pandoc.path.directory(inputFile)})
        local relative = pandoc.path.make_relative(pwd, mdDir, true)


        local betterPath = pandoc.path.join({relative, string.sub(prevLinkTarget, 2)})
        --print(betterPath)
        el.target = betterPath
    end
    return el
end