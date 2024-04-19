import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Blogs } from './pages/Blogs'
import {Blog} from "./pages/Blog"
import { Signin } from './pages/Signin'
import { Publish } from './pages/Publish'
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/Blogs' element={<Blogs/>}></Route>
        <Route path='/Blog/:id' element={<Blog/>}></Route>
        <Route path='/Signin' element={<Signin/>}></Route>
        <Route path='/Publish' element={<Publish/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
