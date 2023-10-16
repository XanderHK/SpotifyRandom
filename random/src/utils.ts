import axios, { AxiosError, AxiosResponse } from "axios"

const API_URL = "http://localhost:8888"

export const getTrack = async (genre?: string) => {
    try {
        const url = genre ? `${API_URL}?genre=` + genre : API_URL
        const response = await axios.get(url)
        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}

export const getResults = async <T>(
    query: string
): Promise<[T | null, AxiosError | null]> => {
    try {
        const url = `${API_URL}/search`
        const response: AxiosResponse<T> = await axios.post(url, { query });
        return [response.data, null];
    } catch (error) {
        const typedError = error as AxiosError;
        return [null, typedError];
    }
};

export const getSuggestions = async <T>(seedId: string): Promise<[T | null, AxiosError | null]> => {
    try {
        const url = `${API_URL}/suggestions`
        const response = await axios.post(url, { seedId })
        return [response.data, null]
    } catch (error) {
        const typedError = error as AxiosError;
        return [null, typedError]
    }
}
