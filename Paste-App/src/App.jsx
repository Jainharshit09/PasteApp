import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import Navabar from './components/Navbar'
import EditPaste from './components/EditPaste'

function App() {
  const routes = createBrowserRouter([
    {
      path:"/",
      element:
        <div>
          <Navabar />
          <Home />
        </div>
        
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navabar />
        <Paste />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navabar />
        <ViewPaste />
      </div>
    }
  ])
  return (
     <div>
      <RouterProvider router={routes} />
     </div>
  )
}

export default App
