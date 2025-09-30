import CardClients from "../components/CardClients";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { Modal } from "../components/Modal";
import { CreateClienteModal } from "../components/CreateClientModal";
import { EditClientModal } from "../components/EditClientModal";
import { DeleteClientModal } from "../components/DeleteClientModal";
import { Pagination } from "../components/Pagination";

// Types of Modal 
type Modaltype = 'Create' | 'Edit' | 'Delete' | null;

interface Client {
    id: number;
    name: string;
    salary: number;
    company: number;
}
const mockClients: Client[] = [
    { id: 1, name: "Eduardo", salary: 3500, company: 120000 },
    { id: 2, name: "Ana", salary: 4200, company: 150000 },
    { id: 3, name: "Carlos", salary: 2800, company: 90000 },
    { id: 4, name: "Mariana", salary: 5000, company: 200000 },
    { id: 5, name: "Lucas", salary: 3200, company: 110000 },
    { id: 6, name: "Beatriz", salary: 4500, company: 160000 },
    { id: 7, name: "Rafael", salary: 3900, company: 130000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
    { id: 8, name: "Juliana", salary: 4800, company: 180000 },
];

export default function ClientsList() {
    // Modal type state management
    const [activeModal, setActiveModal] = useState<Modaltype>(null);
    // State to keep Id of client being edited or deleted
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    // Function to control modal
    const closeModal = () => {
        setActiveModal(null);
        setSelectedClientId(null);
    }
    // Function to open modal specific
    const openCreateModal = () => setActiveModal('Create');

    // Function to open Edit modal and set selected client ID
    const openEditModal = (id: number) => {
        setSelectedClientId(id);
        setActiveModal('Edit');
    }
    const selectedClientData = mockClients.find(c => c.id === selectedClientId);
    // Function to open Delete modal and set selected client ID
    const openDeleteModal = (id: number) => {
        setSelectedClientId(id);
        setActiveModal('Delete');
    }

    // function to decide which modal to render
    const renderModalContent = () => {
        
        if ((activeModal === 'Edit' || activeModal === 'Delete') && selectedClientId === null) {
            return null; // No client selected, don't render anything
        }
        switch (activeModal) {
            case 'Create':
                return <CreateClienteModal onClose={closeModal} />;
            case 'Edit':
                return <EditClientModal clientData={selectedClientData!} onClose={closeModal} />;
            case 'Delete':
                return <DeleteClientModal clientData={selectedClientData!} onClose={closeModal} />;
            default:
                return null;
        }
    }

    // States for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(16);
    const [totalPages, setTotalPage] = useState(12);
    const totalClients = 16;

    //Navigation function
    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPage){
            setCurrentPage(page);
        }
    };
    //Function to limit change page (select)
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    }
        return (
            <div className="bg-stone-200">
                <Navbar />
                <section className="p-10 flex flex-col max-w-6xl mx-auto">
                    {/* Header content */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <strong>{totalClients}</strong>                            
                            <h2 className="">clientes encontrados:</h2>
                        </div>
                        
                        <div className="flex items-center space-x-2">                        
                            <h2>Clientes por página: </h2>
                            <select className="border border-gray-300 rounded-sm focus: outline-none cursor-pointer">
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={32}>32</option>
                            </select>
                        </div>
                    </div>
                    {/* Clients List Cards*/}
                    <div className="w-full flex flex-wrap gap-4 mt-2">
                        {mockClients.map((client) => (
                            <CardClients 
                                key={client.id}
                                clientId={client.id}
                                name={client.name}
                                salary={client.salary}
                                company={client.company}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                            />    
                        ))}
                    </div>
                    <button className="mt-4 p-2 text-sm font-bold cursor-pointer text-orange-600 text-bold w-full border-2 border border-orange-500 rounded-sm" onClick={openCreateModal}>
                        Criar cliente
                    </button>
                    {/* Pagination */}
                    <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                    />
                    {/* Modal */}
                    <Modal isOpen={activeModal !== null} onClose={closeModal}>
                        {renderModalContent()}
                    </Modal>
                </section>
            </div>
        );
    }