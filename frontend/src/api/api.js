import axios from 'axios';

const API_URL = 'http://localhost:8009/api';

export const getSeats = async (showTime, theaterName) => {
  try {
    const response = await axios.get(`${API_URL}/seats`, {
      params: { showTime, theaterName }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const bookTicket = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/book`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
