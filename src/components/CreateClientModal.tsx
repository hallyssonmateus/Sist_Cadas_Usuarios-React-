import React from "react";

interface CreateClienteModalProps {
    onClose: () => void;
}

export const CreateClienteModal: React.FC<CreateClienteModalProps> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //Close modal on submit
        onClose();
    }

return (
   <form onSubmit={handleSubmit}>
    <h3 className="text-sm font-bold mb-4">Criar Cliente:</h3>
            <div className="space-y-3">
                <input type="text" placeholder="Digite o nome:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <input type="text" placeholder="Digite o salário:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <input type="text" placeholder="Digite a empresa:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded-xs hover:bg-orange-600 transition-colors">
                    Criar cliente
                </button>
            </div>
   </form>
);
};