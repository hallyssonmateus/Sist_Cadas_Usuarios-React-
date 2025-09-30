import { FaPlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { GoTrash } from "react-icons/go";

// Define props that CardClients will receive
interface CardClientsProps {
    clientId: number;
    name?: string;
    salary?: number;
    company?: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function CardClients({ clientId, name,salary,company, onEdit, onDelete }: CardClientsProps) {
 return (
    <div className="card bg-white w-[245px] h-[138px] p-2 rounded-xs shadow-sm flex flex-col justify- items-center gap-1">
        <h2 className="font-bold">Cliente ID:{name}</h2>
        <p>Salário: R${salary}</p>
        <p>Empresa: R${company}</p>
        <div className="flex justify-between p-2 w-full">
            <button className="text-lg cursor-pointer">
                <FaPlus />
            </button>
            <button className="text-lg cursor-pointer" onClick={() => onEdit(clientId)}>
                <LuPencil />
            </button>
            <button className="text-red-600 text-lg cursor-pointer" onClick={() => onDelete(clientId)}>
                <GoTrash />
            </button>
        </div>
    </div>
 );
}