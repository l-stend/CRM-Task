export interface ContactItem {
  id: number
  name: string
  email: string
  phone: string
  company: string
  status: ContactStatus
  country: string
}

export type ContactStatus = 'customer' | 'interested' | 'contacted' | 'negotiation'
