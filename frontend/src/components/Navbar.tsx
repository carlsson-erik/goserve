import { Link } from 'react-router-dom'
import 'twin.macro'
import paths from 'utils/paths'

const Navbar = () => {
  return (

    <div tw="p-2 flex gap-2 bg-gray-700">
      <Link to={paths.root} tw='p-2 font-medium text-2xl text-gray-100'>
        <span >Go Serve</span>
      </Link>
    </div>
  )
}

export default Navbar
