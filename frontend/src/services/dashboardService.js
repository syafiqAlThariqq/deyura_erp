import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboard = async (month) => {

    const response = await axios.get(API_URL, {
        params: { month }
    });

    return response.data;
};

export const refreshDashboard = async () => {

    const response = await axios.post(
        `${API_URL}/refresh`
    );

    return response.data;
};