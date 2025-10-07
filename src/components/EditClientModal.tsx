import React, { useEffect, useState } from "react";
// Import interface Client from Types
import type { Client } from "../types/Client";

type FormData = Omit<Client, 'id'>;

interface EditClientModalProps {
    clientData: Client;
    onClose: () => void;
    onUpdate: (id: number, data: FormData) => void;
}

export const EditClientModal: React.FC<EditClientModalProps> = ({ clientData, onClose, onUpdate }) => {
    // Inicial State form data via Props
    const [formData, setFormData] = useState<FormData>({
        name: clientData.name,
        salary: clientData.salary,
        companyValuation: clientData.companyValuation
    });

    //Update state form when clientData prop changes
    useEffect(() => {
        setFormData({
            name: clientData.name,
            salary: clientData.salary,
            companyValuation: clientData.companyValuation
        });
    }, [clientData]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, 
            [name]: name === 'salary' || name === 'companyValuation' ? Number(value) : value
        }));
    };
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Call the function onUpdate, pass ID from client and new datas
        onUpdate(clientData.id, formData);
        //Close modal on submit
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-sm font-bold mb-4">Editar Cliente: {clientData.name}</h3>
            <div className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} required
                    placeholder="Digite o nome:"
                    className="w-full border border-gray-300 px-2 rounded-xs"
                />
                <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange} required
                    placeholder="Digite o salário:"
                    className="w-full border border-gray-300 px-2 rounded-xs"
                />
                <input
                    type="number"
                    name="companyValuation"
                    value={formData.companyValuation}
                    onChange={handleChange} required
                    placeholder="Digite a empresa:"
                    className="w-full border border-gray-300 px-2 rounded-xs"
                />
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white p-2 rounded-xs hover:bg-orange-600 transition-colors"
                >
                    Salvar alterações
                </button>
            </div>
        </form>
    )
}