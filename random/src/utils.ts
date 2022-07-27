import axios from "axios"

export const getTrack = async (genre?: string) => {
    try {
        const url = genre ? "http://localhost:8888?genre=" + genre : "http://localhost:8888"
        const response = await axios.get(url)
        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}
