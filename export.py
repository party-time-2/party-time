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

    print("Step 1: copy files to temporary directory")
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

    print("Step 2: check glossary definitions")
    # define paths
    design_entscheidungen_Path = Path("docs/Design-Entscheidungen/design-entscheidungen.md")
    glossar_Path = Path("docs/Glossar/glossar.md")
    if design_entscheidungen_Path.exists() and glossar_Path.exists():
        # paths exist, read content of files
        with open(design_entscheidungen_Path, "r") as file:
            design_entscheidungen_content = file.read()
        with open(glossar_Path, "r") as file:
            glossar_content = file.read()

        # determine required entries
        required_re = re.compile(r"_(.*?)_", re.MULTILINE)
        required_terms = set()
        required_terms.update(required_re.findall(design_entscheidungen_content))
        required_terms.update(required_re.findall(glossar_content))
        required_terms = set([x.lower() for x in required_terms])
        print(f"{len(required_terms)} required glossary terms found")

        # determine defined entries
        defined_terms = re.findall(r"(?<=## ).*?(?=$)", glossar_content, re.MULTILINE)
        defined_terms = set([x.lower() for x in defined_terms])
        print(f"{len(defined_terms)} glossary terms found")
        print("")

        # compare entry sets
        required_but_not_defined = required_terms - defined_terms
        defined_but_not_required = defined_terms - required_terms

        # output result
        if not required_but_not_defined:  # required_but_not_defined is empty
            print("All required entries were defined")
        else:  # required_but_not_defined has entries
            print(f"The following required entries were not defined:")
            print("\n".join(sorted(required_but_not_defined)) + "\n")

        if not defined_but_not_required:  # defined_but_not_required is empty
            print("All defined entries are used")
        else:  # defined_but_not_required has entries
            print(f"The following defined entries are unused:")
            print("\n".join(sorted(defined_but_not_required)) + "\n")
    else:
        # glossary/design-entscheidungen files don't exist, output debug info
        print(f'{design_entscheidungen_Path}: {"exists" if design_entscheidungen_Path.exists() else "missing"}')
        print(f'{glossar_Path}: {"exists" if glossar_Path.exists() else "missing"}')

    print("Step 3: convert .md files to .pdf")
    md_files = glob(f'{tempdirname}/**/*.md', recursive=True)
    if md_files:
        lua_script_path = script_dir.joinpath("makerelativepaths.lua")
        for index, src_str in enumerate(md_files):
            src_path = Path(src_str)
            dest_path = src_path.with_suffix(".pdf")
            print(f"({index+1}/{len(md_files)}): Converting {src_path.relative_to(tempdirname)} -> {dest_path.relative_to(tempdirname)}")
            subprocess.run(["/usr/bin/pandoc", src_path, "-o", dest_path, "--lua-filter", lua_script_path], cwd=temp_Path)
            src_path.unlink()

    export_output_name=f"output{get_timestamp()}"
    shutil.make_archive(export_output_name, "zip", tempdirname)
    print(f"Export output written to {export_output_name}.zip")
