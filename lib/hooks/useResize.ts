import { useEffect } from 'react'

export const useResize = (cb: (event: UIEvent) => void): void => {
  useEffect(() => {
    console.log('here')
    window.addEventListener('resize', cb)

    return () => {
      window.removeEventListener('resize', cb)
    }
  }, [cb])
}
