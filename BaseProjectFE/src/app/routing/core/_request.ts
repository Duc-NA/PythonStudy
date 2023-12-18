import axios from 'axios'
import { ModuleModel } from './_models'
import { BaseContentRespone } from '../../modules/core/models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_MODULE_BY_USER = `${API_URL}/module/getbyusername`

// Server should return AuthModel
export function getModuleByUserName(username: string) {
    username = "spark"
    return axios.get<BaseContentRespone<[ModuleModel]>>(GET_MODULE_BY_USER, {
        params: {
            username: username
        },
    });
}
