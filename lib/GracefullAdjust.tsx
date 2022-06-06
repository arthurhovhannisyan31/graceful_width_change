import React, {
  FC,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  useCallback,
} from 'react'

import { GraceFullAdjustProps, Size } from 'lib/types'

import { getInitSize } from 'lib/helpers/getInitSize'
import { useResize } from 'lib/hooks/useResize'
import { useDebounce } from 'lib/hooks/useDebounce'

import './styles.css'
import { graceFullAdjust } from 'lib/helpers/graceFullAdjust'

const GraceFullAdjust: FC<GraceFullAdjustProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const initSize = useMemo(() => getInitSize(), [])

  const [size, setSize] = useState<Size>(initSize)
  const gu = graceFullAdjust(setSize)

  const sizeGraceFullUpdate = useCallback(
    (curSize: Size) => {
      gu(size, curSize)
    },
    [gu, size],
  )

  const resizeHandler = useDebounce(sizeGraceFullUpdate)

  useResize(resizeHandler)

  const cssProperties: CSSProperties = useMemo(
    () => ({
      width: size.width,
      height: size.height,
    }),
    [size],
  )
  return (
    <div
      ref={containerRef}
      className="gracefull-container"
      style={{ ...cssProperties }}
    >
      {children}
    </div>
  )
}

export default GraceFullAdjust
