import { Size } from 'lib/types'

export const getInitSize = (): Size => {
  const rect = document.body.getBoundingClientRect()

  return {
    width: rect?.width || 0,
    height: rect?.height || 0,
  }
}
