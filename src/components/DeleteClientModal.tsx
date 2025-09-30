import React from 'react';

// Client Interface 
interface Client {
    id: number;
    name: string;
    salary: number;
    company: number;
}

// Props for DeleteClientModal
interface DeleteClientModalProps {
    clientData: Client;
    onClose: () => void;
}

export const DeleteClientModal: React.FC<DeleteClientModalProps> = ({clientData, onClose}) => {
    // Handle deletion logic
    const handleDelete = () => {
        console.log(`Client with ID ${clientData.id} deleted.`);
        onClose();
    };

 return (
   <div>
    <h3 className="text-sm font-bold mb-4">Excluir Cliente: {clientData.name}</h3>
    <p>Você esta preste a excluir o cliente: <strong>{clientData.name}</strong></p>
    <button onClick={handleDelete} className="w-full bg-orange-500 text-white p-2 rounded-xs hover:bg-orange-600 transition-colors mt-4">
        Confirmar exclusão
    </button>
   </div>
 );
}