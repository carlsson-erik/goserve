import tw from 'twin.macro'
import { Logo } from './components'
import Navbar from './components/Navbar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import paths from './utils/paths'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import DashboardCreateScreen from './screens/dashboard/DashboardCreateScreen'
import HomeScreen from 'screens/HomeScreen'

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
    <div tw="h-screen w-screen bg-gray-800 text-gray-100">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
