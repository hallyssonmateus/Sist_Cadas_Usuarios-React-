import React, { useEffect, useState } from "react";

// Client data type
interface Client {
    id: number;
    name: string;
    salary: number;
    company: number;
}
interface EditClientModalProps {
    clientData: Client;
    onClose: () => void;
}

export const EditClientModal: React.FC<EditClientModalProps> = ({ clientData, onClose }) => {
    // Inicial State form data via Props
    const [formData, setFormData] = useState({
        name: clientData.name,
        salary: clientData.salary.toString(),
        company: clientData.company.toString(),
    });

    //Update state form when clientData prop changes
    useEffect(() => {
        setFormData({
            name: clientData.name,
            salary: clientData.salary.toString(),
            company: clientData.company.toString(),
        });
    }, [clientData]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        //Close modal on submit
        onClose();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-sm font-bold mb-4">Editar Cliente: {clientData.name}</h3>
            <div className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite o nome:"
                    className="w-full border border-gray-300 px-2 rounded-xs"
                />
                <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Digite o salário:"
                    className="w-full border border-gray-300 px-2 rounded-xs"
                />
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
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