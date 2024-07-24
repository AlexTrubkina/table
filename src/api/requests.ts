import { MetersInfo, SuccessResponse } from "@/helpers/types";
import { AddressInfo } from "net";

const BASE_URL = 'http://showroom.eis24.me'

const fetchData = async<T> (url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, options);
        const data: T = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            new Error(error.message);
        }
    }
}

export const getMeters = async (offset: string) => {
    const url = `${BASE_URL}/api/v4/test/meters/?limit=20&offset=${offset}`
    return fetchData<MetersInfo>(url);
}

export const getAddress = async () => {
    const url = `${BASE_URL}/api/v4/test/areas/`
    return fetchData<AddressInfo>(url);
}

export const deleteMeter = async (id: string) => {
    const url = `${BASE_URL}/api/v4/test/meters/${id}/`;
    return fetchData<SuccessResponse>(url, {
        method: 'DELETE'
    })
}