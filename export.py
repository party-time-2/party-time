from tempfile import TemporaryDirectory
import json
import subprocess
import shutil
from datetime import datetime
from glob import glob
from pathlib import Path
import re
from argparse import ArgumentParser

step_count = 1
script_dir = Path(__file__).absolute().parent

def copy_to_temp_dir(temp_Path: Path):
    """Copy files described in export.json from the working directory to a temp directory

    Args:
        temp_Path (Path): destination path of the copy operation
    """
    global step_count
    print(f"Step {step_count}: copy files to temporary directory")
    step_count += 1

    global script_dir
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
            if index + 1 != len(json_data):
                print()

def check_glossary(glossary_root: Path) -> bool:
    """Checks the glossary for unused/undefined terms

    Args:
        glossary_root (Path): path below which to look for the glossary.md and design_entscheidungen.md

    Returns:
        bool: overall success of the operation - may return false if there are unused/undefined terms in the glossary
    """
    global step_count
    print(f"Step {step_count}: check glossary definitions")
    step_count += 1

    # define paths
    design_entscheidungen_Path = glossary_root.joinpath(Path("docs/Design-Entscheidungen/design-entscheidungen.md"))
    glossary_Path = glossary_root.joinpath(Path("docs/Glossar/glossar.md"))
    if design_entscheidungen_Path.exists() and glossary_Path.exists():
        # paths exist, read content of files
        with open(design_entscheidungen_Path, "r") as file:
            design_entscheidungen_content = file.read()
        with open(glossary_Path, "r") as file:
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
        print(f"{len(defined_terms)} defined glossary terms found")
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
            print("\n".join(sorted(defined_but_not_required)))

        return not (required_but_not_defined or defined_but_not_required)
    else:
        # glossary/design-entscheidungen files don't exist, output debug info
        print(f'{design_entscheidungen_Path}: {"exists" if design_entscheidungen_Path.exists() else "missing"}')
        print(f'{glossary_Path}: {"exists" if glossary_Path.exists() else "missing"}')
        return False
    
def md_to_pdf(md_files_root_Path: Path) -> bool:
    """Transforms markdown files into pdf files and deletes markdown files

    Args:
        md_files_root_Path (Path): root directory in which to look for markdown files (recursively)

    Returns:
        bool: overall success of the operation - operations may fail if pandoc reports problems
    """
    global step_count
    print(f"Step {step_count}: convert .md files to .pdf")
    step_count += 1

    overall_success = True

    global script_dir
    md_files = sorted(md_files_root_Path.glob('**/*.md'))
    if md_files:
        lua_script_path = script_dir.joinpath("makerelativepaths.lua")
        for index, src_str in enumerate(md_files):
            src_path = Path(src_str)
            dest_path = src_path.with_suffix(".pdf")
            print(f"({index+1}/{len(md_files)}): Converting {src_path.relative_to(md_files_root_Path)} -> {dest_path.relative_to(md_files_root_Path)}")
            subprocess_res = subprocess.run(["/usr/bin/pandoc", src_path, "-o", dest_path, "--lua-filter", lua_script_path], cwd=temp_Path)
            if subprocess_res.returncode != 0:
                overall_success = False
            src_path.unlink()
    print(f"Overall success: {overall_success}")
    return overall_success

def zip_result(temp_Path: Path):
    """zips the content of a directory to an output zip archive into the working directory

    Args:
        temp_Path (Path): path whose content should be zipped
    """
    global step_count
    print(f"Step {step_count}: zip result")
    step_count += 1
    def get_timestamp() -> str:
        current_date = datetime.now()
        return current_date.strftime("%Y-%m-%d--%H-%M-%S")

    export_output_name=f"output--{get_timestamp()}"
    shutil.make_archive(export_output_name, "zip", temp_Path)
    print(f"Export output written to {export_output_name}.zip")


parser = ArgumentParser(
    prog="Project export helper",
    description="Utility tool for exporting project data"
)

parser.add_argument("-c", "--check-glossary",
                    dest="glossary_only", action="store_true",
                    help="Only checks the glossary for missing/unused terms")

args = parser.parse_args()

if args.glossary_only:
    check_glossary_success = check_glossary(script_dir)
    if not check_glossary_success:
        exit(1)
else:
    export_success = True

    with TemporaryDirectory(prefix="party-time-") as tempdirname:
        temp_Path = Path(tempdirname)

        print(f"created temporary directory {temp_Path}")

        copy_to_temp_dir(temp_Path)
        print()

        if not check_glossary(temp_Path):
            export_success = False
        print()

        if not md_to_pdf(temp_Path):
            export_success = False
        print()

        zip_result(temp_Path)
    if not export_success:
        exit(1)
