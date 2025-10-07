import Logo from '../assets/Logo.png'
import { MdArrowCircleLeft } from "react-icons/md";
import { RiHome4Fill, RiUserFill, RiUserFollowFill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom';

interface SideBarProps {
  // Function to close sidebar
  onClose: () => void;
}

export default function Sidebar({onClose}: SideBarProps) {
    //Get the current URL
    const location = useLocation();

    //Function to help verify if route is active
    const isLinkActive = (path: string) => location.pathname === path;
  return (
    <aside className="h-screen w-[260px] bg-gray-100">
      {/* Superior Sidebar */}
      <nav className="h-full flex flex-col relative">
        <header className="w-full h-[128px] bg-zinc-700 flex items-center justify-center rounded-tr-lg">
          <img src={Logo} className='w-32' />
          <div className='h-[42px] w-[42px] bg-zinc-950 border absolute
          top-[85px] left-[170px] 
          sm:top-[85px] sm:left-[240px]
          md:top-[85px] md:left-[240px]
          lg:top-[90px] lg:left-[240px]
          rounded-[50%] flex items-center justify-center cursor-pointer'>
            <button className='text-white h-[16px] w-[16px] cursor-pointer'
                    onClick={onClose}>
              <MdArrowCircleLeft />
            </button>
          </div>

        </header>
        {/* Inferior Sidebar */}
        <div className='h-full px-4 py-6'>
          <ul className='flex flex-col gap-8 px-4'>
            <li>
              <Link to="/" className='flex items-center gap-4 cursor-pointer font-semibold hover:text-orange-400'>
              <RiHome4Fill />
              Home
              </Link>
            </li>
            <li>
              <Link to="/clients-list" className={`flex items-center gap-4 cursor-pointer
              ${isLinkActive('/clients-list') ? 'text-orange-500 font-semibold border-r-3' : 'text-black font-semibold hover:text-orange-400'}
                `}>
              <RiUserFill />
              Clientes
              </Link>
            </li>
            <li>
              <Link to="/clients-selected" className={`flex items-center gap-4 cursor-pointer
              ${isLinkActive('/clients-selected') ? 'text-orange-500 font-semibold border-b-3' : 'text-black font-semibold hover:text-orange-400'}
                `}>
              <RiUserFollowFill />
              Clientes selecionados
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}