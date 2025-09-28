import CardSelectClients from "../components/CardSelectClients";
import Navbar from "../components/Navbar";

export default function ClientsSelected() {
 return (
   <div className="bg-stone-200 h-screen">
    <Navbar />
    <section className="p-10 flex flex-col max-w-6xl mx-auto">
      {/* Header content */}
      <h1 className="font-bold">Clientes Selecionados:</h1>
      {/* Selected Clients List Cards*/}
      <div className="w-full flex flex-wrap gap-4 mt-2">
        <CardSelectClients />
        <CardSelectClients />
        <CardSelectClients />
        <CardSelectClients />
        <CardSelectClients />
        <CardSelectClients />
        <CardSelectClients />
        <CardSelectClients />
      </div>
      {/* Button Inferior */}
      <button className="mt-4 p-2 text-sm font-bold cursor-pointer text-orange-600 text-bold w-full border-2 border border-orange-500 rounded-sm ">
        Limpar clientes selecionados
      </button>
    </section>
   </div>
 );
}