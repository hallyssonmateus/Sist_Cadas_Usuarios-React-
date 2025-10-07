import CardClients from "../components/CardClients";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "../components/Modal";
import { CreateClienteModal } from "../components/CreateClientModal";
import { EditClientModal } from "../components/EditClientModal";
import { DeleteClientModal } from "../components/DeleteClientModal";
import { Pagination } from "../components/Pagination";
import type { Client } from "../types/Client";
import { getClients } from "../api/clientService";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { createClient } from "../api/clientService";
import { UpdateClient } from "../api/clientService";
import { deleteClient } from "../api/clientService";

// Types of Modal 
type Modaltype = 'Create' | 'Edit' | 'Delete' | null;

type UpdateData = Omit<Client, 'id'>;

interface ClientsListProps {
    onAddClient: (client: Client) => void;
    selectedClients: Client[];
}

const mockClients: Client[] = [
    { id: 1, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 2, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 3, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 4, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 5, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 6, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 7, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 8, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 9, name: "Ana", salary: 4200, companyValuation: 150000 },
    { id: 10, name: "Carlos", salary: 2800, companyValuation: 90000 },
    { id: 11, name: "Mariana", salary: 5000, companyValuation: 200000 },
    { id: 12, name: "Lucas", salary: 3200, companyValuation: 110000 },
    { id: 13, name: "Beatriz", salary: 4500, companyValuation: 160000 },
    { id: 14, name: "Rafael", salary: 3900, companyValuation: 130000 },
    { id: 15, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 16, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 17, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 18, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 19, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 20, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 21, name: "Juliana", salary: 4800, companyValuation: 180000 },

];

export default function ClientsList({onAddClient, selectedClients}: ClientsListProps) {
    // SideBar State
    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    //Function to toggle
    const toggleSidebar = () => {
        setisSidebarOpen(prev => !prev);
    }
    const sidebarWidth = '260px';
    // Modal type state management
    const [activeModal, setActiveModal] = useState<Modaltype>(null);
    // State to keep Id of client being edited or deleted
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    // Clients list from API
    const [clients, setClients] = useState<Client[]>([]);
    // Charge state
    const [isLoading, setIsLoading] = useState(true);
    // Total items - API meta
    const [totalItems, setTotalItems] = useState(0);
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
    //const selectedClientData = mockClients.find(c => c.id === selectedClientId);
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
                return <CreateClienteModal onClose={closeModal} onCreate={handleCreateClient}/>;
            case 'Edit':
            case 'Delete':
                {// Reseach logic
                const selectedClientData = clients.find(c => c.id === selectedClientId);

                if (!selectedClientData) return null; // Proteção localizada

                if (activeModal === 'Edit') {
                    return <EditClientModal clientData={selectedClientData} onClose={closeModal} onUpdate={handleUpdateClient}/>;
                } else { // activeModal === 'Delete'
                    return <DeleteClientModal clientData={selectedClientData} onClose={closeModal} onDelete={handleDeleteClient}/>;
                }
            }
            default:
                return null;
        }
    }

    // States for Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(16);
    const [totalPages, setTotalPages] = useState(12);

    //Navigation function
    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    //Function to limit change page (select)
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(Number(e.target.value));
        setCurrentPage(1);
    }

    // Response Api - Get Clients
    const fetchClients = useCallback(async (page: number, limit: number) => {
        setIsLoading(true);
        try {
            // Real call to API
            const responseData = await getClients(page, limit);
            // Update of Data e Pagination
            //Update the list Clients to atual page
            //setClients(responseData.clients);
            let clientsToDisplay = responseData.clients;
            if (clientsToDisplay.length === 0){
                // Se a API retornou zero clientes, use o mock
                console.warn("API retornou array vazio. Usando mockClients para desenvolvimento.");
            
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            clientsToDisplay = mockClients.slice(startIndex, endIndex);
            const totalClientsMock = mockClients.length;
                const totalPagesMock = Math.ceil(totalClientsMock / limit);
                setTotalPages(totalPagesMock);
                setTotalItems(totalClientsMock);
        } else {
            // Se a API retornou dados REAIS, use a resposta da API (original)
                
                // Se a API não tiver dado `totalItems`, use o tamanho da página atual
                setTotalItems(responseData.clients.length); 

                // Lógica de TotalPages da API (com sua proteção contra zero)
                const apiTotalPages = responseData.totalPages > 0 
                    ? responseData.totalPages 
                    : 5; // Mantém a simulação alta se a API falhar
                setTotalPages(apiTotalPages);
        }
        setClients(clientsToDisplay);
            //setTotalPages(responseData.totalPages)
            // Se a API retornar 0 páginas, definimos um valor fixo ALTO (ex: 5)
            // const simulatedTotalPages = responseData.totalPages > 0
            //     ? responseData.totalPages
            //     : 5; // Valor Fixo para forçar os botões a aparecerem

            // setTotalPages(simulatedTotalPages);
            // --- FIM DO TESTE DE FORÇA DE PAGINAÇÃO ---

            console.log("Dados da API recebidos com metadados:", responseData);

            setTotalItems(responseData.clients.length);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("Erro Axios ao buscar clientes:", error.response);
            } else {
                console.error("Erro de Rede ou Formato Inesperado:", error);
            }
            setClients([]);
            setTotalItems(0);
            setTotalPages(0);
        } finally {
            setIsLoading(false);
        }
    }, [setClients, setTotalItems, setTotalPages, setIsLoading]);

    // Response API - Post clients
    const handleCreateClient = async (clientData: Omit<Client, 'id'>) => {
        setIsLoading(true);
        try {
            await createClient(clientData);
            console.log("Client criado com sucesso!");
            fetchClients(currentPage, limit);
        } catch (error) {

            console.error("Falha ao criar cliente:", error);
        } finally {
            setIsLoading(false);
            closeModal();
        }
    }

    // Response API - Edit clients
    const handleUpdateClient = async (id: number, clientData: UpdateData) => {
        setIsLoading(true);
        try {
            await UpdateClient(id, clientData);

            console.log(`Cliente ${id} editado com sucesso!"`);

            //Recharge the updated data list
            fetchClients(currentPage, limit);
        } catch (error) {
            console.error(`falha ao editar o cliente ${id}:`, error);
        } finally {
            setIsLoading(false);
            closeModal();
        }
    }
    // Response API - Delete clients
    const handleDeleteClient = async (id: number) => {
        setIsLoading(true);
        try{
            await deleteClient(id);

            console.log(`Cliente ${id} excluido com sucesso!`);
            fetchClients(currentPage, limit);
        } catch (error){
            console.error(`Falha ao excluir cliente ${id}:`, error);
        } finally {
            setIsLoading(false);
            closeModal();
        }
    }
    // Effect to research the data when page ou limit change
    useEffect(() => {
        fetchClients(currentPage, limit);
    }, [currentPage, limit, fetchClients]);

    const getClientByID = (id: number) => { 
    return clients.find(c => c.id === id);
}

    const handleAddClient = (clientId: number) => {
        const clientToAdd = getClientByID(clientId);
        if (clientToAdd){
            onAddClient(clientToAdd);
        }
    };

    return (
        <div className="bg-stone-200 flex min-h-screen">
            {/* Layout Section: Altern between Sidebar and Navbar */}
            {isSidebarOpen && (
                <Sidebar onClose={toggleSidebar} />
            )}
            {/* Main Content - Client List */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? `pl-[${sidebarWidth}]` : 'pl-0'}`}
            >
                
                {!isSidebarOpen && <Navbar onToggleSidebar={toggleSidebar} />}
                <section className="p-10 flex flex-col max-w-6xl mx-auto">
                    {/* Header content */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <strong>{totalItems}</strong>
                            <h2 className="">clientes encontrados:</h2>
                        </div>

                        <div className="flex items-center space-x-2">
                            <h2>Clientes por página: </h2>
                            <select className="border border-gray-300 rounded-sm focus: outline-none cursor-pointer"
                                value={limit}
                                onChange={handleLimitChange}>
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={32}>32</option>
                            </select>
                        </div>
                    </div>
                    {/* Clients List Cards*/}
                    <div className="w-full flex flex-wrap gap-4 mt-2">
                        {isLoading ? (
                            // Render the Loading while API reponse
                            <p className="w-full text-center text-gray-500 py-10"> Carregando clients...</p>
                        ) : (
                            //Mapping the Real clients from API
                            clients.map((client) => {
                                const isSelected = selectedClients.some(c => c.id === client.id);

                                return (
                                <CardClients
                                    key={client.id}
                                    clientId={client.id}
                                    name={client.name}
                                    salary={client.salary}
                                    company={client.companyValuation}
                                    onEdit={openEditModal}
                                    onDelete={openDeleteModal} 
                                    onAddClient={() => handleAddClient(client.id)}
                                    isSelected={isSelected}
                                    />
                                );
                            }
                            )
                        )}
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
        </div>
    );
}