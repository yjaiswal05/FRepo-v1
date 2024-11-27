import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getHeroImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/hero-images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hero images:', error);
    throw error;
  }
}; 