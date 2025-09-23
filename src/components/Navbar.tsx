import logo from '../assets/logo.png'

export default function Navbar() {
 return (
    <div className="navbar px-4 h-[90px] bg-gray-50 text-white">
        <div className='flex items-center px-4 py-2 gap-6'>
            <button className='text-2xl mr-6'>
                <ul>
                    <li className='mb-2 cursor-pointer text-black hover:text-gray-300'>☰</li>
                </ul>
            </button>
            <img src={logo} alt="Logo" className='w-28'/>

            <nav className='items-center ml-150'>
                <ul className='flex gap-6 text-md text-black font-semibold'>
                    <li className='hover:text-gray-300 cursor-pointer'>Clientes</li>
                    <li className='hover:text-gray-300 cursor-pointer'>Clientes Selecionados</li>
                    <li className='hover:text-gray-300 cursor-pointer'>Sair</li>
                </ul>
            </nav>

            <div className='ml-150 text-md cursor-pointer text-black'>
                Olá, <strong>Usuário!</strong>
            </div>
        </div>
    </div>
 );
}