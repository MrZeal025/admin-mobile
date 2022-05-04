import axios from 'axios';

const baseUrl = 'https://juanbreath-server.herokuapp.com';

export const getLocation = data => {
  return axios.get(`${baseUrl}/api/public/location/all`, data);
};