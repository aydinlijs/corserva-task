import paypal from './paypal.png'
import venmo from './venmo.png'

interface IconProps {
  width?: string
}
export const PaypalIcon = (props: IconProps) => {
  return <img {...props} src={paypal} alt="_paypal logo" />
}

export const VenmoIcon = (props: IconProps) => {
  return <img {...props} src={venmo} alt="_venmo logo" />
}
