from pathlib import Path
import shutil

def copy_other_md_files():
    """
    Copies files from the docs/other folder to the requirements folder.

    If the docs/requirements folder does not exist, it will be created.
    """

    docs_path = Path.cwd().joinpath("docs")
    assert docs_path.exists(), "The docs folder does not exist."

    docs_requirements_src_path = docs_path.joinpath("requirements-src")
    other_dir = docs_requirements_src_path.joinpath("other")

    out_dir = docs_path.joinpath(".requirements/other")
    out_dir.mkdir(parents=True, exist_ok=True)
    
    for file in other_dir.iterdir():
        if file.is_file() and file.suffix == ".md":
            out_file = out_dir.joinpath(file.name)
            shutil.copyfile(file, out_file)

    
if __name__ == '__main__':
    copy_other_md_files()