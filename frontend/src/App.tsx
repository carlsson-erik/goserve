import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import paths from './utils/paths'
import DashboardScreen from './screens/dashboard/DashboardScreen'
import DashboardCreateScreen from './screens/dashboard/DashboardCreateScreen'
import HomeScreen from 'screens/HomeScreen'
import AboutScreen from 'screens/Misc/AboutScreen'

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
        {
          path: paths.dashboard.about,
          element: <AboutScreen />,
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
