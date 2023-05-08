import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Typography,
  checkboxClasses,
  styled,
} from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { UIRadioGroup } from '../../UIRadioGroup/UIRadioGroup'
import { VisibilityWrapper } from '../../VisibilityWrapper'
import { FormFooter } from '../FormFooter/FormFooter'
import { paymentOptions } from '../Shared'
import { PaymentForm } from './CardDetails'
import { GiftCard } from './GiftCard'
import {
  CardDetails,
  PaymentInformation,
} from '../../OrderStepper/OrderStepper.interface'

const DeliverySchema = yup.object().shape({
  paymentOption: yup.string(),
  paymentDetails: yup.object().optional(),
})

export const PaymentOptionsForm = ({
  onSubmit,
  onGoBack,
  amount,
  onGiftCardApply,
  initialValues,
}: {
  onSubmit: (values: PaymentInformation) => void
  amount: number
  onGoBack: () => void
  onGiftCardApply: (value: string) => void
  initialValues: PaymentInformation
}) => {
  const [paypalCheckbox, setPaypalCheckbox] = useState(false)
  const [venmoCheckbox, setVenmoCheckbox] = useState(false)
  const [isPaymentOptionsValid, setIsPaymentOptionsValid] = useState(false)
  const [cardInfo, setCardInfo] = useState<CardDetails>({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DeliverySchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false)
        }, 400)
        values.paymentDetails = cardInfo
        onSubmit(values)
        if (values.paymentOption === 'paypal') {
          window.open('https://www.paypal.com', '_blank')
        }
        if (values.paymentOption === 'venmo') {
          window.open('https://venmo.com/', '_blank')
        }
      }}
    >
      {({
        errors,
        values,
        touched,
        isSubmitting,
        setFieldValue,
        handleSubmit,
        ...fieldProps
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography
            sx={{ marginTop: '20px', marginBottom: '10px' }}
            variant="h5"
          >
            Payment Information
          </Typography>
          <FormControl fullWidth>
            <UIRadioGroup
              fields={paymentOptions}
              value={values.paymentOption}
              name="paymentOption"
              manuallyChangeValue={(value: string) => {
                setFieldValue('paymentOption', value)
                setPaypalCheckbox(false)
                setVenmoCheckbox(false)
              }}
              onChange={fieldProps.handleChange}
            />
          </FormControl>
          <Divider sx={{ marginBlock: '20px' }} />
          <VisibilityWrapper visible={values.paymentOption === 'credit-card'}>
            <PaymentForm
              cardInfo={cardInfo}
              onValueChange={setCardInfo}
              onValidationChange={setIsPaymentOptionsValid}
            />
          </VisibilityWrapper>
          <VisibilityWrapper visible={values.paymentOption === 'paypal'}>
            <StyledFormControlLabel
              control={
                <Checkbox
                  checked={paypalCheckbox}
                  onChange={() => {
                    setPaypalCheckbox((prev) => !prev)
                  }}
                  name="paypalCheckbox"
                />
              }
              label={
                'By clicking "Save and continue" you agree to Paypal Terms and Conditions. Clicking on "Continue" button will automatically take you to the Paypal authentication page.'
              }
            />
          </VisibilityWrapper>
          <VisibilityWrapper visible={values.paymentOption === 'venmo'}>
            <StyledFormControlLabel
              control={
                <Checkbox
                  checked={venmoCheckbox}
                  onChange={() => {
                    setVenmoCheckbox((prev) => !prev)
                  }}
                  name="venmoCheckbox"
                />
              }
              label={
                'By clicking "Save and continue" you agree to Venmo Terms and Conditions. Clicking on "Continue" button will automatically take you to the Venmo authentication page.'
              }
            />
          </VisibilityWrapper>
          <Divider sx={{ marginBlock: '20px' }} />
          <GiftCard onApply={onGiftCardApply} />
          <FormFooter
            onGoBack={onGoBack}
            amount={amount}
            disableContinue={
              isSubmitting ||
              (values.paymentOption === 'paypal' && !paypalCheckbox) ||
              (values.paymentOption === 'venmo' && !venmoCheckbox) ||
              (values.paymentOption === 'credit-card' && !isPaymentOptionsValid)
            }
          />
        </form>
      )}
    </Formik>
  )
}

const StyledFormControlLabel = styled(FormControlLabel)`
  display: flex;
  align-items: flex-start;
  gap: 2px;

  .${checkboxClasses.root} {
    padding-block: 0;
  }
`
