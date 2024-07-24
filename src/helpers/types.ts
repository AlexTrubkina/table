export interface Meter {
  id: string
  _type: string[]
  area: {
    id: string
  }
  is_automatic: boolean
  communication: string
  description: string
  serial_number: string
  installation_date: string
  brand_name: string
  model_name: string
  initial_values: number[]
}

export interface MetersInfo {
  results: Meter[]
  count: number
  next: string | null
  previous: string | null
}

export interface Address {
  id: string
  number: number
  str_number: string
  str_number_full: string
  house: {
    address: string
    id: string
    fias_addrobjs: string[]
  }
}

export interface AddressesInfo {
  results: Address[]
  count: number
  next: string | null
  previous: string | null
}

export interface SuccessResponse {
  detail: string
}
