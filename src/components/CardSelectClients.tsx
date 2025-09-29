import { FaMinus } from "react-icons/fa6";

export default function CardSelectClients() {
 return (
   <div className="card bg-white w-[245px] h-[138px] p-2 rounded-xs shadow-sm flex flex-col justify- items-center gap-1">
        <h2 className="font-bold">Eduardo</h2>
                <p>Salário: R$3.500,00</p>
                <p>Empresa: R$120.000,00</p>
                <div className="flex justify-end p-2 w-full">
                    <button className="text-red-600 text-lg cursor-pointer">
                        <FaMinus />
                    </button>
                </div>
   </div>
 );
}