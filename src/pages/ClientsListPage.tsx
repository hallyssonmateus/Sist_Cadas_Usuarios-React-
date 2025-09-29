import CardClients from "../components/CardClients";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Modal } from "../components/Modal";


export default function ClientsList() {
    const [isModalOpen, setIsModalOpen] =  useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

 return (
   <div className="bg-stone-200">
    <Navbar />
    <section className="p-10 flex flex-col max-w-6xl mx-auto">
        {/* Header content */}
        <div className="flex justify-between">
            <h2>16 clientes encontrados: </h2>
            <h2>Clientes por página: </h2>
        </div>
        {/* Clients List Cards*/}
        <div className="w-full flex flex-wrap gap-4 mt-2">
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
            <CardClients />
        </div>
        <button className="mt-4 p-2 text-sm font-bold cursor-pointer text-orange-600 text-bold w-full border-2 border border-orange-500 rounded-sm" onClick={openModal}>
            Criar cliente
        </button>
        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h3 className="text-sm font-bold mb-4">Criar Cliente:</h3>
            <div className="space-y-3">
                <input type="text" placeholder="Digite o nome:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <input type="text" placeholder="Digite o salário:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <input type="text" placeholder="Digite a empresa:" className="w-full border border-gray-300 px-2 rounded-xs" />
                <button className="w-full bg-orange-500 text-white p-2 rounded-xs hover:bg-orange-600 transition-colors">
                    Criar cliente
                </button>
            </div>
        </Modal>
    </section>
   </div>
 );
}