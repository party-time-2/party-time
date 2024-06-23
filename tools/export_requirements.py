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
    
    def find_test_png(requirement_dir: Path) -> list[Path]:
        return [file for file in find_png(requirement_dir) if not file.stem.endswith(("act", "seq"))]

    def create_md_files(requirement_dir: Path):
        dir_name = requirement_dir.name

        out_dir = dot_requiremtns_path.joinpath(dir_name)
        out_dir.mkdir(parents=True, exist_ok=True)

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

            act_path = next((x for x in out_dir.iterdir() if x.is_file() and x.stem.endswith("act")), None)
            if act_path:
                md_file_blocks.append("## Aktivitätsdiagramm")
                md_file_blocks.append("")
                md_file_blocks.append(f"![{act_path.name}]({quote(act_path.relative_to(out_dir).as_posix())})")
                md_file_blocks.append("")
            else:
                print(f"No activity diagram for dir {dir_name} found.")

            seq_path = next((x for x in out_dir.iterdir() if x.is_file() and x.stem.endswith("seq")), None)
            if seq_path:
                md_file_blocks.append("## Sequenzdiagramm")
                md_file_blocks.append("")
                md_file_blocks.append(f"![{seq_path.name}]({quote(seq_path.relative_to(out_dir).as_posix())})")
                md_file_blocks.append("")
            else:
                print(f"No sequence diagram for dir {dir_name} found.")
            

            test_pics = find_test_png(out_dir)
            if test_pics:
                md_file_blocks.append("## Bilder")
                md_file_blocks.append("")
                for pic in test_pics:
                    md_file_blocks.append(f"### {pic.stem}")
                    md_file_blocks.append("")
                    md_file_blocks.append(f"![{pic.name}]({quote(pic.relative_to(out_dir).as_posix())})")
                    md_file_blocks.append("")

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
            copy_png_files(dir)
            create_md_files(dir)


if __name__ == '__main__':
    copy_requirements()