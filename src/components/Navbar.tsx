import { useEffect, useState } from 'react';
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'

// key that we use in localStorage
const USER_NAME_STORAGE_KEY = 'userName';

// Interface prop
interface NavbarProps {
    onToggleSidebar: () => void;
}

export default function Navbar({onToggleSidebar}: NavbarProps) {
    // Retrieve userName from localStorage
    const [displayedUserName, setDisplayedUserName] = useState('Usuário');
    // Effect to read localStorage
    useEffect(() => {
        const storedUserName = localStorage.getItem(USER_NAME_STORAGE_KEY);
        // if have any name save, update the state
        if (storedUserName) {
            setDisplayedUserName(storedUserName);
        }
    }, []);
    return (
        <div className="flex items-center justify-between navbar px-4 h-[90px] bg-gray-50 text-white">
            {/* Left Container: Logo and Button Menu */}
            <div className='flex items-center px-4 py-2 gap-6'>
                <button className='text-2xl text-black hover:text-orange-500 cursor-pointer'
                        onClick={onToggleSidebar}>
                    ☰
                </button>
                <img src={logo} alt="Logo" className='w-28' />
            </div>
            {/* Center Container: Navigation Links */}
            <nav>
                <ul className='flex gap-6 text-md text-black font-semibold'>
                    {/* Using the Link component from react-router-dom for navigation */}
                    <li>
                        <Link to="/clients-list" className='hover:text-orange-500 cursor-pointer'>Clientes</Link>
                    </li>
                    <li>
                        <Link to="/clients-selected" className='hover:text-orange-500 cursor-pointer'>Clientes Selecionados</Link>
                    </li>
                    <li>
                        <Link to="/" className='hover:text-orange-500 cursor-pointer'>Sair</Link>
                    </li>
                </ul>
            </nav>
            {/* Right Container: User Greeting */}
            <div className='text-md cursor-pointer text-black'>
                Olá, <strong>{displayedUserName}!</strong>
            </div>
        </div>
    );
}