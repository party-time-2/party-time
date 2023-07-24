import tempfile
import json
import os
import shutil

with tempfile.TemporaryDirectory(prefix="party-time-") as tempdirname:
    print(f"created temporary directory {tempdirname}")
    with open("export.json") as exportFile:
        for exportFileName in json.load(exportFile):
            print(f"Handling: {exportFileName}")
            # Ensure destination dir exists
            dest = tempdirname + "/" + exportFileName
            dest_dirname = os.path.dirname(dest)
            os.makedirs(dest_dirname, exist_ok=True)
            print(f"Confirmed {dest_dirname} exists")

            # Copy file or directory
            print(f"Destination file name: {dest}")
            if os.path.isfile(exportFileName):
                shutil.copy(exportFileName, dest)
                print(f"File copied to {dest}")
            elif os.path.isdir(exportFileName):
                shutil.copytree(exportFileName, dest, dirs_exist_ok=True)
                print(f"Directory copied to {dest}")
    
    shutil.make_archive("output", "zip", tempdirname)
