import { apiRequest } from '../../../services/api'

export interface Customer {
  id: string

  name: string

  cpf?: string

  phone: string | null

  email?: string | null

  state?: string | null

  address?: string | null

  city?: string | null

  reference?: string | null

  birthdate?: string | null
}

export interface CreateCustomerData {
  name: string

  cpf?: string | null

  phone: string

  email?: string | null

  state?: string | null

  address?: string | null

  city?: string | null

  reference?: string | null

  birthdate?: string | null
}

export const customerApi = {
  list() {
    return apiRequest<Customer[]>('/customers')
  },

  create(data: CreateCustomerData) {
    return apiRequest<Customer>('/customers', {
      method: 'POST',

      body: JSON.stringify(data)
    })
  },

  findById(id: string) {
    return apiRequest<Customer>(`/customers/${id}`)
  },

  delete(id: string) {
    return apiRequest<Customer>(`/customers/${id}`, {
      method: 'DELETE'
    })
  }
}
