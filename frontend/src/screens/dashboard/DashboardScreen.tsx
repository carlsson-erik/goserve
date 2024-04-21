import Button from '../../components/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../../utils/paths'

const DashboardScreen = () => {
  const name = React.useState('')

  const dashboardData = undefined

  return (
    <div>
      {dashboardData ? (
        <div>We got data! </div>
      ) : (
        <div tw="text-black">
          <span>No dasboard created</span>
          <Link to={paths.dashboard.create}>
            <Button>Create dashboard</Button>
          </Link>
        </div>
      )}
      <span tw="text-2xl">Create new dashboard</span>
    </div>
  )
}

export default DashboardScreen
