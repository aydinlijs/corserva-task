import { Divider, Typography } from '@mui/material'
import { deliveryOptions, paymentOptions } from '../Shared'

const formatAddress = (
  lines: string[],
  city: string,
  country: string,
  zip: string
) => {
  console.log(lines, city, country, zip)
  return (
    [...lines, city, country].filter((line) => line).join(', ') + `(${zip})`
  )
}

export const DetailsReview = (props: any[]) => {
  const { 0: personal, 1: delivery, 2: payment } = props

  const deliveryType = deliveryOptions.find(
    (option) => option.value === delivery.deliveryOption
  )
  const paymentType = paymentOptions.find(
    (option) => option.value === payment.paymentOption
  )

  return (
    <div className="payment-details-review">
      <div className="card">
        <Typography variant="h5">Personal details</Typography>
        <table>
          <tbody>
            <tr>
              <td>
                {personal.name} {personal.surname} ({personal.email})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Divider sx={{ marginBlock: '10px' }} />
      <div className="card">
        <table>
          <tbody>
            <tr>
              <td>
                <b>Delivery type:</b>
              </td>
              <td>{deliveryType?.label}</td>
            </tr>
            {delivery.deliveryOption !== 'pick-up' && (
              <tr>
                <td>Address:</td>
                <td>
                  {formatAddress(
                    [delivery.lineOne, delivery.lineTwo, delivery.lineThree],
                    delivery.city,
                    delivery.country,
                    delivery.zip
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Divider sx={{ marginBlock: '10px' }} />
      <div className="card">
        <table>
          <tbody>
            <tr>
              <td>
                <b>Payment type:</b>
              </td>
              <td>{paymentType?.label}</td>
            </tr>
            <tr>
              <td>
                <b>Card number:</b>
              </td>
              <td>
                {payment.paymentDetails?.cardNumber} (exp on:{' '}
                {payment.paymentDetails?.expirationDate})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
