import axios from 'axios';

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})

/////// AUTH
export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  return resp.data
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/users/verify');
    return resp.data
  }
  return false;
}



/////////// ENTRIES
export const fetchAllEntries = async () => {
  const res = await api.get('/entries/all/');
  return res.data;
}

export const fetchEntries = async (id) => {
  const res = await api.get(`/users/${id}/entries/`);
  return res.data;
}


export const fetchEntry = async (user_id, id) => {
  const res = await api.get(`/users/${user_id}/entries/${id}`);
  return res.data;
}

export const createEntry = async (data) => {
  const id = data.user_id;
  const res = await api.post(`/users/${id}/entries/`, data);
  return res.data;
}

export const updateEntry = async (data) => {
  const user_id = data.user_id;
  const id = data.id;
  const res = await api.put(`/users/${user_id}/entries/${id}/`, data);
  return res.data;
}

export const deleteEntry = async (user_id, id) => {
  const res = await api.delete(`/users/${user_id}/entries/${id}`);
  return res.data;
}

///////////  COMMENTS

export const fetchComments = async (user_id, id) => {
  const res = await api.get(`/users/${user_id}/entries/${id}/comments/`);
  return res.data;
}

export const createComment = async (user_id, data) => {
  const id = data.entry_id;
  const res = await api.post(`/users/${user_id}/entries/${id}/comments/`, data);
  return res.data;
}

export const updateComment = async (user_id, data) => {
  const entry_id = data.entry_id;
  const id = data.id;
  const res = await api.put(`/users/${user_id}/entries/${entry_id}/comments/${id}`, data);
  return res.data;
}

export const deleteComment = async (user_id, entry_id, id) => {
  const res = await api.delete(`/users/${user_id}/entries/${entry_id}/comments/${id}`);
  return res.data;
}