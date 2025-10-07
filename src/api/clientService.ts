import axios from "axios";
import type { Client, ClientListResponse } from "../types/Client";

const API_BASE_URL = "https://boasorte.teddybackoffice.com.br"

type NewClientData = Omit<Client, 'id'>;

export const getClients = async (page: number, limit: number): Promise<ClientListResponse> => {
    const response = await axios.get<ClientListResponse>(`${API_BASE_URL}/users`, {
        params: {
            page: page,
            limit: limit
        }
    });
    return response.data;
}

//Sent requisition Post to create a new client into API
export async function createClient(clientData: NewClientData): Promise<Client> {
    try {
        const response = await axios.post<Client>(
            `${API_BASE_URL}/users`, 
            clientData
        );
        //Return all complete object, includind ID
        return response.data;
    } catch (error){
        if(axios.isAxiosError(error) && error.response){
            console.error("Erro ao criar cliente:", error.response.data);
            throw new Error(error.response.data.message || "Falha na criação do cliente.");
        }
        throw new Error("Erro de rede ou formato inesperado ao criar cliente.");
    }
}

// Requisition Patch to edit client into API
type UpdateClientData = Partial<Omit<Client, 'id'>>;

export async function UpdateClient(id: number, clientData: UpdateClientData): Promise<Client> {
    try {
        const response = await axios.patch<Client>(
            `${API_BASE_URL}/users/${id}`,
            clientData
        );
        return response.data
    } catch (error){
        if(axios.isAxiosError(error) && error.response){
            console.error(`Erro ao editar o client ${id}:`, error.response.data)
            throw new Error(error.response.data.message || "Falha na edição do cliente");
        }
        throw new Error("Erro de rede ou formato inesperado ao editar cliente.")
    }
}
