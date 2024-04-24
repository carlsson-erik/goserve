import Navbar from 'components/Navbar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardCreateScreen from './dashboard/DashboardCreateScreen'
import DashboardScreen from './dashboard/DashboardScreen'
import paths from '../utils/paths'
import AboutScreen from './Misc/AboutScreen'

const HomeScreen = () => {
  return (
    <div tw="flex flex-col">
      <Navbar />
      <Routes>
        <Route path={paths.dashboard.root} element={<DashboardScreen />} />
        <Route
          path={paths.dashboard.create}
          element={<DashboardCreateScreen />}
        />
        <Route path={paths.dashboard.about} element={<AboutScreen />} />
        <Route path={'/*'} element={<DashboardScreen />} />
      </Routes>
    </div>
  )
}

export default HomeScreen
