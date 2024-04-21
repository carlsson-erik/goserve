import tw from 'twin.macro'
import { Logo } from './components'
import Navbar from './components/Navbar'
import HomeScreen from './screens/HomeScreen'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import paths from './utils/paths'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import DashboardCreateScreen from './screens/dashboard/DashboardCreateScreen'

const App = () => {
  const router = createBrowserRouter([
    {
      path: paths.root,
      element: <HomeScreen />,
      children: [
        {
          path: paths.dashboard.root,
          element: <DashboardScreen />,
        },
        {
          path: paths.dashboard.create,
          element: <DashboardCreateScreen />,
        },
      ],
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
