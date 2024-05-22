import { apiClient } from "./apiclient";

export const retrieveTodos = (username) =>
  apiClient.get(`users/${username}/todos`);

export const deleteTodosForUser = (username, id) =>
  apiClient.delete(`users/${username}/todos/${id}`);
export const retrieveSpecificTodoForUser = (username, id) =>
  apiClient.get(`users/${username}/todos/${id}`);

export const updateTodo = (username, id, todo) => {
  return apiClient.put(`users/${username}/todos/${id}`, todo);
};

export const createTodoApi = (username, todo) => {
  return apiClient.post(`/users/${username}/todos`, todo);
};

export const executeBasicAuthenticationService = (token) =>
  apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });

export const executeJwtAuthenticationService = (username, password) =>
  apiClient.post(`/authenticate`, { username, password });
