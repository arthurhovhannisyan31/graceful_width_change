import * as React from 'react'

import './styles.css'
import GraceFullAdjust from 'lib/GracefullAdjust'

const App = (): JSX.Element => {
  return (
    <GraceFullAdjust>
      <div className={'container'}></div>
    </GraceFullAdjust>
  )
}

export default App
