import { FaMinus } from "react-icons/fa6";
import type { Client } from "../types/Client";

interface CardSelectClientsProps {
    clientData: Client;
    onRemoveClient: () => void;
}
export default function CardSelectClients({clientData, onRemoveClient}: CardSelectClientsProps) {
 return (
   <div className="card bg-white w-[245px] h-[138px] p-2 rounded-xs shadow-sm flex flex-col justify- items-center gap-1">
        <h2 className="font-bold">{clientData.name}</h2>
                <p>Salário: R${clientData.salary}</p>
                <p>Empresa: R${clientData.companyValuation}</p>
                <div className="flex justify-end p-2 w-full">
                    <button className="text-red-600 text-lg cursor-pointer"
                            onClick={onRemoveClient}>
                        <FaMinus />
                    </button>
                </div>
   </div>
 );
}