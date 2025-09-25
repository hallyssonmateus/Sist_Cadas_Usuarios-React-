import { FaPlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { GoTrash } from "react-icons/go";

export default function CardClients() {
 return (
    <div className="card bg-white w-[285px] h-[138px] p-2 rounded-xs shadow-sm flex flex-col justify- items-center gap-1">
        <h2 className="font-bold">Eduardo</h2>
        <p>Salario: R$3.500,00</p>
        <p>Empresa: R$120.000,00</p>
        <div className="flex justify-between p-2 w-full">
            <button className="text-lg cursor-pointer">
                <FaPlus />
            </button>
            <button className="text-lg cursor-pointer">
                <LuPencil />
            </button>
            <button className="text-red-600 text-lg cursor-pointer">
                <GoTrash />
            </button>
        </div>
    </div>
 );
}