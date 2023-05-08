import {
  CreditCardOutlined,
  DeliveryDiningOutlined,
  ElectricBoltOutlined,
  HailOutlined,
} from '@mui/icons-material'
import { PaypalIcon, VenmoIcon } from '../../assets/images/icons'

export const deliveryOptions = [
  { value: 'pick-up', label: 'Self pick up', icon: <HailOutlined /> },
  {
    value: 'standard-delivery',
    label: 'Standard delivery',
    icon: <DeliveryDiningOutlined />,
  },
  {
    value: 'fast-delivery',
    label: 'Express delivery',
    icon: <ElectricBoltOutlined />,
  },
]

export const paymentOptions = [
  {
    value: 'credit-card',
    icon: <CreditCardOutlined />,
    label: 'Credit card',
  },
  { value: 'paypal', label: '', icon: <PaypalIcon width="80px" /> },
  { value: 'venmo', label: '', icon: <VenmoIcon width="50px" /> },
]
