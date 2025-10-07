import React, {useState} from "react";
import type { Client } from "../types/Client";

type FormData = Omit<Client, 'id'>;

interface CreateClienteModalProps {
    onClose: () => void;
    onCreate: (data: FormData) => void;
}

export const CreateClienteModal: React.FC<CreateClienteModalProps> = ({ onClose, onCreate }) => {
    
    const [formData, setFormData] = useState<FormData>({ 
        name: '', 
        salary: 0, 
        companyValuation: 0 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'salary' || name === 'companyValuation' ? Number(value) : value 
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Call the function onCreate from props, sent the datas
        onCreate(formData);
        //Close modal on submit
        onClose();
    }

return (
   <form onSubmit={handleSubmit}>
    <h3 className="text-sm font-bold mb-4">Criar Cliente:</h3>
            <div className="space-y-3">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Digite o nome:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} required placeholder="Digite o salário:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <input type="text" name="companyValuation" value={formData.companyValuation} onChange={handleChange} required placeholder="Digite a empresa:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded-xs hover:bg-orange-600 transition-colors">
                    Criar cliente
                </button>
            </div>
   </form>
);
};