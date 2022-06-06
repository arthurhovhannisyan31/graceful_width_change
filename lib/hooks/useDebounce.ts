import { Size } from 'lib/types'
import { debounce } from 'lib/helpers/debounce'
import { RESIZE_DELAY_DURATION } from 'lib/constants'
import { useCallback } from 'react'

export const useDebounce = (
  cb: (arg: Size) => void,
): ((event: Event) => void) => {
  return useCallback(
    debounce((event: Event) => {
      const { innerWidth, innerHeight } = event.currentTarget as Window
      cb({
        width: innerWidth,
        height: innerHeight,
      })
    }, RESIZE_DELAY_DURATION),
    [],
  )
}
