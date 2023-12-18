import axios from 'axios'
import { BaseContentRespone } from '../../../../core/models';
import { IUpdateEmail } from '../SettingsModel';

const API_URL = process.env.REACT_APP_API_URL

export const CHANGE_EMAIL = `${API_URL}/auth/changeemail`

// Server should return AuthModel
export function changeEmail(value: IUpdateEmail) {
    console.log('changeEmail function called with:', value);

    return axios.post<BaseContentRespone<string>>(CHANGE_EMAIL, value);
}

