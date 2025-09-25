import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="flex items-center justify-between navbar px-4 h-[90px] bg-gray-50 text-white">
            {/* Left Container: Logo and Button Menu */}
            <div className='flex items-center px-4 py-2 gap-6'>
                <button className='text-2xl text-black hover:text-gray-300'>
                    ☰
                </button>
                <img src={logo} alt="Logo" className='w-28' />
            </div>
            {/* Center Container: Navigation Links */}
            <nav>
                <ul className='flex gap-6 text-md text-black font-semibold'>
                    {/* Using the Link component from react-router-dom for navigation */}
                    <li>
                        <Link to="/clients-list" className='hover:text-gray-300 cursor-pointer'>Clientes</Link>
                    </li>
                    <li>
                        <Link to="/clients-selected" className='hover:text-gray-300 cursor-pointer'>Clientes Selecionados</Link>
                    </li>
                    <li>
                        <Link to="/" className='hover:text-gray-300 cursor-pointer'>Sair</Link>
                    </li>
                </ul>
            </nav>
            {/* Right Container: User Greeting */}
            <div className='text-md cursor-pointer text-black'>
                Olá, <strong>Usuário!</strong>
            </div>
        </div>
    );
}