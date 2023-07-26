from tempfile import TemporaryDirectory
import json
import subprocess
import shutil
from datetime import datetime
from glob import glob
from pathlib import Path
import re

def get_timestamp() -> str:
    current_date = datetime.now()
    return current_date.strftime("--%Y-%m-%d--%H-%M-%S")

script_dir = Path(__file__).absolute().parent

with TemporaryDirectory(prefix="party-time-") as tempdirname:
    temp_Path = Path(tempdirname)

    print(f"created temporary directory {temp_Path}")

    step_count = 1

    print(f"Step {step_count}: copy files to temporary directory")
    step_count += 1
    with open(script_dir.joinpath("export.json")) as exportFile:
        json_data = json.load(exportFile)
        for index, exportFileName in enumerate(json_data):
            src_file_relative = Path(exportFileName)
            print(f"Handling ({index+1}/{len(json_data)}): {exportFileName}")
            # Ensure destination dir exists
            dest_file = temp_Path.joinpath(src_file_relative)
            dest_folder = dest_file.parent
            dest_folder.mkdir(parents=True, exist_ok=True)
            print(f"Confirmed {dest_folder} exists")

            # Copy file or directory
            if src_file_relative.is_file():
                print(f"Destination file name: {dest_file}")
                shutil.copy(src_file_relative, dest_file)
                print(f"File copied to {dest_file}")
            elif src_file_relative.is_dir():
                print(f"Destination dir name: {dest_file}")
                shutil.copytree(src_file_relative, dest_file, dirs_exist_ok=True)
                print(f"Directory copied to {dest_file}")
            print()
    
    path_design_entscheidungen = temp_Path.joinpath("docs/Design-Entscheidungen/design-entscheidungen.md")
    if path_design_entscheidungen.exists():
        print(f"Step {step_count}: Generate glossary")
        step_count += 1
        with open(path_design_entscheidungen, 'r') as file:
            filedata = file.read()

        filedata = filedata.replace("# Design Entscheidungen", "# Glossar", 1)

        path_glossary = path_design_entscheidungen.parent.joinpath("glossar.md")
        filedata = re.sub(r'\*\*Begründung\*\*:.*?(?=##|$)', '', filedata, flags=re.S)
        filedata = filedata.rstrip() + "\n"

        with open(path_glossary, 'w') as file:
            file.write(filedata)


    print(f"Step {step_count}: convert .md file to .pdf")
    md_files = glob(f'{tempdirname}/**/*.md', recursive=True)
    if(len(md_files) > 0):
        lua_script_path = shutil.copy(script_dir.joinpath("makerelativepaths.lua"), temp_Path)
        for index, src_str in enumerate(md_files):
            src_path = Path(src_str)
            dest_path = src_path.with_suffix(".pdf")
            print(f"({index+1}/{len(md_files)}): Converting {src_path.relative_to(tempdirname)} -> {dest_path.relative_to(tempdirname)}")
            subprocess.run(["/usr/bin/pandoc", src_path, "-o", dest_path, "--lua-filter", lua_script_path], cwd=temp_Path)
            src_path.unlink()
        Path(lua_script_path).unlink()



    export_output_name=f"output{get_timestamp()}"
    shutil.make_archive(export_output_name, "zip", tempdirname)
    print(f"Export output written to {export_output_name}.zip")
