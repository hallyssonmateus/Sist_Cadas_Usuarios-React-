import CardClients from "../components/CardClients";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, useCallback} from "react";
import { Modal } from "../components/Modal";
import { CreateClienteModal } from "../components/CreateClientModal";
import { EditClientModal } from "../components/EditClientModal";
import { DeleteClientModal } from "../components/DeleteClientModal";
import { Pagination } from "../components/Pagination";
import type { Client } from "../types/Client";
import { getClients } from "../api/clientService";
import axios from "axios";
import Sidebar from "../components/Sidebar";

// Types of Modal 
type Modaltype = 'Create' | 'Edit' | 'Delete' | null;

const mockClients: Client[] = [
    { id: 1, name: "Eduardo", salary: 3500, companyValuation: 120000 },
    { id: 2, name: "Ana", salary: 4200, companyValuation: 150000 },
    { id: 3, name: "Carlos", salary: 2800, companyValuation: 90000 },
    { id: 4, name: "Mariana", salary: 5000, companyValuation: 200000 },
    { id: 5, name: "Lucas", salary: 3200, companyValuation: 110000 },
    { id: 6, name: "Beatriz", salary: 4500, companyValuation: 160000 },
    { id: 7, name: "Rafael", salary: 3900, companyValuation: 130000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    { id: 8, name: "Juliana", salary: 4800, companyValuation: 180000 },
    
];

export default function ClientsList() {
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
    const [totalPages, setTotalPages] = useState(12);

    //Navigation function
    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages){
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
            const responseData  = await getClients(page, limit);
            // Update of Data e Pagination
            //Update the list Clients to atual page
            setClients(responseData.clients);

            //setTotalPages(responseData.totalPages)
            // Se a API retornar 0 páginas, definimos um valor fixo ALTO (ex: 5)
            const simulatedTotalPages = responseData.totalPages > 0 
                ? responseData.totalPages 
                : 5; // Valor Fixo para forçar os botões a aparecerem

            setTotalPages(simulatedTotalPages);
            // --- FIM DO TESTE DE FORÇA DE PAGINAÇÃO ---

            console.log("Dados da API recebidos com metadados:", responseData);

            setTotalItems(responseData.clients.length);
        } catch (error){
            if(axios.isAxiosError(error) && error.response){
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
    },[setClients, setTotalItems, setTotalPages, setIsLoading]);
    // Effect to research the data when page ou limit change
    useEffect(() => {
        fetchClients(currentPage, limit);
    }, [currentPage, limit, fetchClients]);
    
        return (
            <div className="bg-stone-200 flex min-h-screen">
                {/* Layout Section: Altern between Sidebar and Navbar */}
                {isSidebarOpen && (
                    <Sidebar onClose={toggleSidebar}/>
                )}
                {/* Main Content - Client List */}
                <div className="flex-1 transition-all duration-300"
                    style={{marginLeft: isSidebarOpen ? sidebarWidth: '0',
                        width: isSidebarOpen ? `calc(100% - ${sidebarWidth})` : '100%'
                    }}>
                    
                    {!isSidebarOpen && <Navbar onToggleSidebar={toggleSidebar}/>}
                    <section className="p-10 flex flex-col">
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
                                clients.map((client) => (
                                    <CardClients 
                                        key={client.id}
                                        clientId={client.id}
                                        onEdit={openEditModal}
                                        onDelete={openDeleteModal}/>
                                ))
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