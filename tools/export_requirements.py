from pathlib import Path
import shutil
import json
from urllib.parse import quote

def copy_requirements():
    docs_path = Path.cwd().joinpath("docs")
    assert docs_path.exists(), "The docs folder does not exist."

    docs_requirements_src_path = docs_path.joinpath("requirements-src")
    dot_requiremtns_path = docs_path.joinpath(".requirements")
    dot_requiremtns_path.mkdir(parents=True, exist_ok=True)

    def find_png(requirement_dir: Path) -> list[Path]:
        return [file for file in requirement_dir.iterdir() if file.is_file() and file.suffix == ".png"]

    def create_md_files(requirement_dir: Path):
        dir_name = requirement_dir.name

        json_file = requirement_dir.joinpath(f"{dir_name}-req.json")
        assert json_file.exists(), f"File {json_file} does not exist."

        with open(json_file, "r") as json_file:
            data = json.load(json_file)

            md_file_blocks = [
                f"# {data['id']} - {data['title']}",
                "",
                f"<{data['reference']}>",
                "",
                "## Beschreibung",
                "",
                data["description"],
                "",
                "## Auswirkung",
                "",
                data["impact"],
                "",
                "## Abnahmekriterien",
                "",
                "\n".join(map(lambda x: "- " + x, data["criteria"])),
                "",
            ]

            pics = find_png(requirement_dir)
            if pics:
                md_file_blocks.append("## Bilder")
                md_file_blocks.append("")
                for pic in pics:
                    md_file_blocks.append(f"### {pic.stem}")
                    md_file_blocks.append("")
                    md_file_blocks.append(f"![{pic.name}]({quote(pic.relative_to(requirement_dir).as_posix())})")
                    md_file_blocks.append("")

            out_dir = dot_requiremtns_path.joinpath(dir_name)
            out_dir.mkdir(parents=True, exist_ok=True)

            out_file = out_dir.joinpath(f"{dir_name}-req.md")
            with open(out_file, "w") as req_json_md_file:
                req_json_md_file.write("\n".join(md_file_blocks))

    def copy_png_files(requirement_dir: Path):
        dir_name = requirement_dir.name

        out_dir = dot_requiremtns_path.joinpath(dir_name)
        out_dir.mkdir(parents=True, exist_ok=True)

        for file in find_png(requirement_dir):
            out_file = out_dir.joinpath(file.name)
            shutil.copyfile(file, out_file)

    for dir in docs_requirements_src_path.iterdir():
        if dir.is_dir() and dir.name != "other":
            create_md_files(dir)
            copy_png_files(dir)


if __name__ == '__main__':
    copy_requirements()