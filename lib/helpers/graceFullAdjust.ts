import { Size } from 'lib/types'

export const graceFullAdjust = (
  cb: (props: Size) => void,
  ms = 50,
): ((initSize: Size, targetSize: Size) => void) => {
  let isInProgress = false
  let frames: [() => void, number][] = []
  let timeoutID: NodeJS.Timeout

  return (initSize: Size, targetSize: Size) => {
    clearTimeout(timeoutID)
    if (isInProgress) {
      const last = frames.shift()
      last?.[0]()
      frames = []
      return
    }

    isInProgress = true

    const widthDiff = targetSize.width - initSize.width
    const heightDiff = targetSize.height - initSize.height
    const distance = Math.sqrt(widthDiff ** 2 + heightDiff ** 2)

    const step = 10 + Math.ceil(distance / 50)
    const timeStep = ms / step

    const widthStep = widthDiff / step
    const heightStep = heightDiff / step

    let offset = 0
    for (let i = 0; i < step; i++) {
      offset = timeStep
      frames.push([
        () => {
          cb({
            width: (initSize.width += widthStep),
            height: (initSize.height += heightStep),
          })
        },
        offset,
      ])
    }
    frames.push([
      () => {
        isInProgress = false
      },
      offset,
    ])

    const callFrame = (): number =>
      requestAnimationFrame(() => {
        const cur = frames.shift()
        if (!cur) return
        const [fn, delay] = cur
        timeoutID = setTimeout(() => {
          fn()
          callFrame()
        }, delay)
      })
    callFrame()
  }
}
