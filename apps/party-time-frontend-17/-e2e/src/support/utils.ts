export function getScreenshotPath(
  requirementNr: string,
  groupName: string,
  testname: string
) {
  return `/${requirementNr}/${requirementNr} - ${groupName} -- ${testname}`;
}
