export interface PersonalInformation {
  name: string
  surname: string
  email: string
}

export interface DeliveryInformation {
  deliveryOption: 'pick-up' | 'standard-delivery' | 'fast-delivery'
  lineOne: string
  lineTwo: string
  lineThree: string
  city: string
  zip: string
  country: string
}

// Payment Information
interface IPaymentDetails {
  cardNumber: string
  expirationDate: string
  securityCode: string
}

export interface PaymentInformation {
  paymentOption: 'paypal' | 'venmo' | 'credit-card'
  paymentDetails: IPaymentDetails
}

export interface CardDetails {
  cardNumber: string
  expirationDate: string
  securityCode: string
}

export interface OrderStepperForms {
  personal: PersonalInformation
  payment: PaymentInformation
  delivery: DeliveryInformation
}
