
import { UserIcon} from '@heroicons/react/20/solid'
import {Link } from 'react-router-dom';

export default function LoginMenu() {
  return (
    <div className="group relative flex gap-x-6 rounded-lg px-4 hover:bg-gray-200 ">
    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
      <UserIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
    </div>
    <div>
      <Link to="/adminlogin" className="font-semibold text-gray-900">
      Login
        <span className="absolute inset-0" />
      </Link>
      <p className="mt-1 text-gray-600">Click here to Login</p>
    </div>
  </div>
  )
}
