import Logo from '../assets/Logo.png'
import { MdArrowCircleLeft } from "react-icons/md";
import { RiHome4Fill, RiUserFill, RiUserFollowFill } from 'react-icons/ri'

export default function components() {
  return (
    <aside className="h-screen w-[260px] bg-gray-100">
      {/* Superior Sidebar */}
      <nav className="h-full flex flex-col relative">
        <header className="w-full h-[128px] bg-zinc-700 flex items-center justify-center">
          <img src={Logo} className='w-32' />
          <div className='h-[42px] w-[42px] bg-zinc-950 border absolute top-[90px] left-[240px] rounded-[50%] flex items-center justify-center cursor-pointer'>
            <button className='text-white h-[16px] w-[16px] cursor-pointer'>
              <MdArrowCircleLeft />
            </button>
          </div>

        </header>
        {/* Inferior Sidebar */}
        <div className='h-full px-4 py-6'>
          <ul className='flex flex-col gap-8 px-4'>
            <li className='flex items-center gap-4 cursor-pointer'>
              <RiHome4Fill />
              Home
            </li>
            <li className='flex items-center gap-4 cursor-pointer'>
              <RiUserFill />
              Clientes
            </li>
            <li className='flex items-center gap-4 cursor-pointer'>
              <RiUserFollowFill />
              Clientes selecionados
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}