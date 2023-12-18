import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {RolesQueryResponse, User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`
const GET_ROLES_URL = `${API_URL}/user/getlistrole`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}
const getRoles = (): Promise<RolesQueryResponse> => {
  return axios
    .get(`${GET_ROLES_URL}`)
    .then((d: AxiosResponse<RolesQueryResponse>) => d.data)
}
const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = async (user: User, file: File | null): Promise<User | undefined> => {
  try {
    const formData = new FormData();

    // Append user data as fields
    formData.append('user', JSON.stringify(user));

    // Append file if it exists
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.put(USER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming Axios throws an error for non-2xx responses
    if (response.status !== 200) {
      console.error('Error updating user. Status:', response.status);
      return undefined;
    }

    return response.data.data;
  }
  catch (error) {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error updating user:', error);
    return undefined;
  }
}

const updateUser =async (user: User, file: File | null): Promise<User | undefined> => {
  try{
    const formData = new FormData();

    // Append user data as fields
    formData.append('user', JSON.stringify(user));

    // Append file if it exists
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.post(`${USER_URL}/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming Axios throws an error for non-2xx responses
    if (response.status !== 200) {
      console.error('Error updating user. Status:', response.status);
      return undefined;
    }

    return response.data.data;
  }
  catch(error)
  {
    // Handle errors here, e.g., log them or throw a custom error
    console.error('Error updating user:', error);
    return undefined;
  }
  
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export { getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser, getRoles }
