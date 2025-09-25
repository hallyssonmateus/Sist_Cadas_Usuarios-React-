import CardClients from "../components/CardClients";
import Navbar from "../components/Navbar";


export default function ClientsList() {
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
        <button className="mt-4 p-2 text-sm font-bold cursor-pointer text-orange-600 text-bold w-full border-2 border border-orange-500 rounded-sm ">
            Criar cliente
        </button>
    </section>
   </div>
 );
}