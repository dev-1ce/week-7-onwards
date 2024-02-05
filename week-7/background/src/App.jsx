
import React from 'react'
import { RecoilRoot } from 'recoil'
import MainApp from "./MainApp"
import "./App.css"

function App() {

  
  return (
    <React.Fragment >
      <RecoilRoot>
        <MainApp/>
      </RecoilRoot>
    </React.Fragment>
    
  )
}

export default App
