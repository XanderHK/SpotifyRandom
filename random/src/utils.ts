import axios from "axios"

export const getTrack = async () => {
    try {
        const response = await axios.get("http://localhost:8888")
        return [response.data, null]
    } catch (error) {
        return [null, error]
    }
}
