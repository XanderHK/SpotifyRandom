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

export const getRefreshToken = async <T>(accessToken: string): Promise<[T | null, AxiosError | null]> => {
    try {
        const response = await axios.post(`${API_URL}/refresh-token`, {
            data: {
                grant_type: 'authorization_code',
                code: accessToken,
                redirect_uri: 'http://localhost:3000/'
            }
        })

        return [response.data, null]
    } catch (err) {
        const typedError = err as AxiosError;
        return [null, typedError]
    }
}

export const getAccessToken = async (refreshToken: string) => {
    try {
        const response = await axios.post(`${API_URL}/access-token`, {
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }
        })

        return [response.data, null]
    } catch (err) {
        return [null, err]
    }
}

// Todo - move to spotify api

export const getUser = async (accessToken: string) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me', // Example: Get user information
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }

        const response = await axios(options)
        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}

export const getPlaylists = async (accessToken: string, userId: string): Promise<[{ id: string, name: string }[] | null, AxiosError | null]> => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`
    try {
        const options = {
            method: 'GET',
            url,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
        const response = await axios(options)
        const result = response.data.items.reduce((acc: { id: string, name: string }[], curr: Record<string, string>) => {
            const details = {
                id: curr.id,
                name: curr.name
            }
            acc.push(details)
            return acc
        }, [])
        return [result, null]
    } catch (err) {
        const typedError = err as AxiosError;
        return [null, typedError]
    }
}

export const addTrackToPlaylist = async (details: { accessToken: string, playlistId: string, trackId: string }) => {
    const { accessToken, playlistId, trackId } = details

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

    try {
        const response = await axios.post(url, {
            uris: [
                trackId
            ],
            position: 0
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })

        return [response.data, null]
    } catch (err) {
        return [null, err]
    }
}

export const addTrackToLibrary = async (details: { accessToken: string, trackId: string }) => {

}