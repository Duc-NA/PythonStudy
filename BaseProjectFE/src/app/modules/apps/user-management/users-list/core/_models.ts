import { type } from 'os'
import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  name?: string
  first_name?: string
  last_name?: string
  avatar?: string
  email?: string
  position?: string
  role?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  initials?: {
    label: string
    state: string
  }
  phone_number?:string
  avatar_remove?:boolean
}
export type Role = {
  Name?: string
  Description?: string
}
export type UsersQueryResponse = Response<Array<User>>

export type RolesQueryResponse = Response<Array<Role>>

export const initialUser: User = {
  avatar: 'avatars/300-6.jpg',
  position: 'Art Director',
  role: 'Administrator',
  name: '',
  first_name: '',
  last_name: '',
  email: '',
  phone_number:''
}
export const initialRole: Role = {
  Name: '',
  Description:''
}