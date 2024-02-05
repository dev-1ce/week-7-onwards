import { useState } from 'react'
import Top from './components/top'
import Heading from './components/heading'
import SubHeading from './components/subheading'
import Footer from './components/footer'
import { RecoilRoot } from 'recoil'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
    <div className="card">
      <Top/>
      <Heading/>
      <SubHeading/>
      <hr />
      <Footer/>
    </div>
    </RecoilRoot>
  )
}

export default App
