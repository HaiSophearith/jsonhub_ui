import { CSpinner } from '@coreui/react'
import React from 'react'
import '../style/loader.css'

export default function Spinners() {
  return (
    <div className='flex justify-center'>
      {/* <Spinner
                aria-label="Extra large spinner example"
                size="xl"
            /> */}
      {/* <CSpinner color="primary"/> */}
      <div class="custom-loader"></div>
    </div>
  )
}
