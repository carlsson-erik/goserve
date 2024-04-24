import { Link } from 'react-router-dom'
import paths from 'utils/paths'
import EditTilesButton from './input/EditTilesButton'

const Navbar = () => {
  return (
    <div tw="p-2 flex justify-between gap-2 bg-gray-700">
      <Link to={paths.root} tw="p-2 font-medium text-2xl text-gray-100">
        <span>Go Serve</span>
      </Link>
      <div tw='flex items-center'>
        <EditTilesButton />
        <Link to={paths.dashboard.about}>
          <button tw="text-white hover:bg-gray-600 p-2">
            About
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
