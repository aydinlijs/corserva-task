import { Divider, Typography } from '@mui/material'
import { deliveryOptions, paymentOptions } from '../Shared'
import { FormFooter } from '../FormFooter/FormFooter'
import { OrderStepperForms } from '../../OrderStepper/OrderStepper.interface'

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

export const DetailsReview = ({
  amount,
  data,
  onGoBack,
}: {
  amount: number
  data: OrderStepperForms
  onGoBack: () => void
}) => {
  const { personal, delivery, payment } = data

  const deliveryType = deliveryOptions.find(
    (option) => option.value === delivery.deliveryOption
  )
  const paymentType = paymentOptions.find(
    (option) => option.value === payment.paymentOption
  )

  return (
    <div className="payment-details-review">
      <div className="card">
        <Typography variant="h5">Order details</Typography>
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
                <td>
                  <b>Address:</b>
                </td>
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
            {paymentType?.value === 'credit-card' && (
              <tr>
                <td>
                  <b>Card number:</b>
                </td>
                <td>
                  {payment.paymentDetails?.cardNumber} (exp on:{' '}
                  {payment.paymentDetails?.expirationDate})
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <FormFooter
        label="Place order"
        onGoBack={onGoBack}
        amount={amount}
        onSubmit={() => {
          alert('Congratulations!')
        }}
        disableContinue={false}
      />
    </div>
  )
}
