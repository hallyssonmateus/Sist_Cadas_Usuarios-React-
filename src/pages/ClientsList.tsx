import CardClients from "../components/CardClients";
import Navbar from "../components/Navbar";


export default function ClientsList() {
 return (
   <div className="bg-stone-200">
    <Navbar />
    <section className="p-10">
        {/* Header content */}
        <div className="flex justify-between">
            <h2>16 clientes encontrados: </h2>
            <h2>Clientes por página: </h2>
        </div>
        {/* Clients List Cards*/}
        <div className="flex flex-wrap gap-4 mt-2">
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
    </section>
   </div>
 );
}