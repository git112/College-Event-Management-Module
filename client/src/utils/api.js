import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getEvents = async () => {
  try {
    const res = await axios.get(`${API_URL}/events`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/events/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const formData = new FormData();
    
    Object.keys(eventData).forEach(key => {
      if (key === 'image' && eventData[key]) {
        formData.append('image', eventData[key]);
      } else if (eventData[key]) {
        formData.append(key, eventData[key]);
      }
    });
    
    const res = await axios.post(`${API_URL}/events`, formData, getAuthConfig());
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const formData = new FormData();
    
    Object.keys(eventData).forEach(key => {
      if (key === 'image' && eventData[key]) {
        formData.append('image', eventData[key]);
      } else if (eventData[key]) {
        formData.append(key, eventData[key]);
      }
    });
    
    const res = await axios.put(`${API_URL}/events/${id}`, formData, getAuthConfig());
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/events/${id}`, getAuthConfig());
    return res.data;
  } catch (error) {
    throw error;
  }
};
