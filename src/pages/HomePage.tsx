import { useState } from "react";
import { useNavigate } from "react-router-dom";

// key to use in localStorage
const USER_NAME_STORAGE_KEY = 'userName';

export default function Home() {

    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
      // Verification if userName is not empty
      if(userName.trim()){
        // Save userName in localStorage
        localStorage.setItem(USER_NAME_STORAGE_KEY, userName.trim());
        navigate('/clients-list');} else {
          alert('Por favor, digite o seu nome para continuar.');
        }
    }

 return (
   <div className="home-container flex flex-col items-center justify-center min-h-screen gap-2 bg-gray-100">
    <h1 className="font-semibold text-3xl">Olá, seja bem-vindo!</h1>
    <input type="text" className="w-[350px] md:w-[521px] h-[60px] border border-gray-600 px-6 rounded-xs" placeholder="Digite o seu nome:" value={userName} onChange={(e) => setUserName(e.target.value)}/>
    <button className="w-[350px] h-[60px] md:w-[521px] h-[60px] bg-orange-500 text-white text-lg font-semibold rounded-sm hover:bg-orange-600" onClick={handleLogin}>Entrar</button>
   </div>
 );
}