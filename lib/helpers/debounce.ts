export const debounce = (
  cb: (args: any) => void,
  ms = 500,
): ((args: any) => void) => {
  let timeoutID: NodeJS.Timeout

  return (args: any) => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => cb(args), ms)
  }
}
