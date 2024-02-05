import React from 'react'
import Navbar from "./Navbar"
import { useRecoilValue } from 'recoil'
import { color } from './atoms/atom'

function MainApp() {
  const colour = useRecoilValue(color);
  const styles = {
     backgroundColor:`${colour}`
  }
  return (
    <React.Fragment >
        <div style={styles} className='disp'>
             <Navbar /> 
        </div>
    </React.Fragment>
  )
}

export default MainApp
