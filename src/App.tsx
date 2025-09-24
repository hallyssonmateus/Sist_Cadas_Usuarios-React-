import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
import './index.css'
import Home from './pages/Home'
import ClientsList from './pages/ClientsList'
import ClientsSelected from './pages/ClientsSelected'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/clients-list' element={<ClientsList />} />
        <Route path='/clients-selected' element={<ClientsSelected />} />        
    </Routes>
    </BrowserRouter>
  );
}

export default App
