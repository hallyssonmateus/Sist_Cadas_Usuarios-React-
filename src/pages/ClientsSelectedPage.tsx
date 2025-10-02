import CardSelectClients from "../components/CardSelectClients";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { Client } from "../types/Client";

interface ClientsSelectedProps {
  selectedClients: Client[];
  onRemoveClient: (clientId: number) => void;
  onClearClients: () => void;
  
}

export default function ClientsSelected({ selectedClients, onRemoveClient, onClearClients }: ClientsSelectedProps) {
  // SideBar State
      const [isSidebarOpen, setisSidebarOpen] = useState(false);
      //Function to toggle
      const toggleSidebar = () => {
          setisSidebarOpen(prev => !prev);
      }
      const sidebarWidth = '260px';
 return (
   <div className="bg-stone-200 min-h-screen flex">
    {isSidebarOpen && (<Sidebar onClose={toggleSidebar}/>)}
    <div className="flex-1 transition-all duration-300"
        style={{
          marginLeft: isSidebarOpen ? sidebarWidth : '0',
          width: isSidebarOpen ? `calc(100% - ${sidebarWidth})` : '100%' 
        }}
        >
          {!isSidebarOpen && <Navbar onToggleSidebar={toggleSidebar}/>}
      <section className="p-10 flex flex-col max-w-6xl mx-auto">
      {/* Header content */}
      <h1 className="font-bold">Clientes Selecionados:</h1>
      {/* Selected Clients List Cards*/}
      <div className="w-full flex flex-wrap gap-4 mt-2">
        {selectedClients.length > 0 ? (
          selectedClients.map((client) => (
            <CardSelectClients 
                key={client.id}
                clientData={client}
                onRemoveClient={() => onRemoveClient(client.id)}/>
          ))
        ) : (
          <p className="w-full text-center text-gray-500 py-10">Nenhum cliente selecionado.</p>
        )}
      </div>
      {/* Button Inferior */}
      <button className="mt-4 p-2 text-sm font-bold cursor-pointer text-orange-600 text-bold w-full border-2 border border-orange-500 rounded-sm "
              onClick={onClearClients}
              disabled={selectedClients.length === 0}>
        Limpar clientes selecionados
      </button>
    </section>
    </div>    
   </div>
 );
}