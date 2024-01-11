
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import HeadFooter from "./HeadFooter"
import Home from "./components/Home/Home"
import About from "./components/About/About"


function App() {
 const router = createBrowserRouter(createRoutesFromElements(
  <Route  path="/" element={<HeadFooter/>}>
    <Route index element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
  </Route>
 ))

  return (
    <>  
    <RouterProvider router={router}/>
    </>
  )
}

export default App
