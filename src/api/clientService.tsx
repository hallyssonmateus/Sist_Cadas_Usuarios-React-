import axios from "axios";
import type { ClientListResponse } from "../types/Client";

const API_BASE_URL = "https://boasorte.teddybackoffice.com.br"

export const getClients = async (page: number, limit: number): Promise<ClientListResponse> => {
    const response = await axios.get<ClientListResponse>(`${API_BASE_URL}/users`, {
        params: {
            page: page,
            limit: limit
        }
    });
    return response.data;
}
