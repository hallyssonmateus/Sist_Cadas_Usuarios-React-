import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useState} from 'react'
import './index.css'
import Home from './pages/HomePage'
import ClientsList from './pages/ClientsListPage'
import ClientsSelected from './pages/ClientsSelectedPage'
import type { Client } from './types/Client'

function App() {
  const [selectedClients, setSelectedClients] = useState<Client[]>([])
  // Manipulation Function
  const addClient = (client: Client) => {
    setSelectedClients(prevClients => {
      if (!prevClients.some(c => c.id === client.id)){
        return [...prevClients, client];
      }
      return prevClients;
    });
  };
  const removeClient = (clientId: number) => {
    setSelectedClients(prevClients => prevClients.filter(c => c.id !== clientId));
  };
  const clearClients = () => {
    setSelectedClients([]);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clients-list' element={<ClientsList 
        // Injection Props into Clients List
        onAddClient={addClient} selectedClients={selectedClients}
        />} />
        <Route path='/clients-selected' element={<ClientsSelected 
        // Injection Props into Clients Selected
        selectedClients={selectedClients}
        onRemoveClient={removeClient}
        onClearClients={clearClients}
        />} />        
    </Routes>
    </BrowserRouter>
  );
}

export default App
