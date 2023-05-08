import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import { useMemo, useState } from 'react'
import { getInitialAmount } from '../../utils/utils'
import { DeliveryDetailsForm } from '../Forms/DeliveryDetailsForm'
import { DetailsReview } from '../Forms/DetailsReview/DetailsReview'
import { PaymentOptionsForm } from '../Forms/PaymentOptions/PaymentOptionsForm'
import { PersonalInformationForm } from '../Forms/PersonalInformationForm'
import { VisibilityWrapper } from '../VisibilityWrapper'
import {
  DeliveryInformation,
  OrderStepperForms,
  PaymentInformation,
  PersonalInformation,
} from './OrderStepper.interface'

export default function OrderStepper() {
  const [activeStep, setActiveStep] = useState(0)
  const [amount, setAmount] = useState(getInitialAmount())
  const [initialData, setInitialData] = useState<OrderStepperForms>({
    personal: { email: '', name: '', surname: '' },
    delivery: {
      deliveryOption: 'pick-up',
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      city: '',
      zip: '',
      country: '',
    },
    payment: {
      paymentOption: 'credit-card',
      paymentDetails: {
        cardNumber: '',
        securityCode: '',
        expirationDate: '',
      },
    },
  })

  const handleDataUpdate = (
    data: PersonalInformation | DeliveryInformation | PaymentInformation,
    form: keyof OrderStepperForms
  ) => {
    setInitialData((prev: OrderStepperForms) => {
      const updated = { ...prev, [form]: data }
      return updated
    })
  }

  const onGiftCardApply = (value: string) => {
    const discountPercentage = value.length > 10 ? 100 : value.length * 10
    setAmount((prev) => (prev * discountPercentage) / 100)
  }

  const onGoBack = () => {
    setActiveStep((step) => --step)
  }

  const steps = useMemo(
    () => [
      {
        label: 'Personal information',
        content: (
          <PersonalInformationForm
            initialValues={initialData.personal}
            amount={amount}
            onSubmit={(values: PersonalInformation) => {
              handleDataUpdate(values, 'personal')
              setActiveStep((step) => ++step)
            }}
          />
        ),
      },
      {
        label: 'Delivery details',
        content: (
          <DeliveryDetailsForm
            onGoBack={onGoBack}
            amount={amount}
            initialValues={initialData.delivery}
            onSubmit={(values: DeliveryInformation) => {
              handleDataUpdate(values, 'delivery')
              setActiveStep((step) => ++step)
            }}
          />
        ),
      },
      {
        label: 'Payment details',
        content: (
          <PaymentOptionsForm
            onGiftCardApply={onGiftCardApply}
            initialValues={initialData.payment}
            amount={amount}
            onGoBack={onGoBack}
            onSubmit={(values: PaymentInformation) => {
              handleDataUpdate(values, 'payment')
              setActiveStep((step) => ++step)
            }}
          />
        ),
      },
      {
        label: 'Review',
        content: (
          <DetailsReview
            amount={amount}
            onGoBack={onGoBack}
            data={initialData}
          />
        ),
      },
    ],
    [amount, initialData]
  )

  return (
    <Box>
      <Stepper sx={{ marginBlock: '50px' }} nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton
              color="inherit"
              onClick={() => {
                if (activeStep > index) {
                  setActiveStep(index)
                }
              }}
            >
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {steps.map((step, index) => (
        <VisibilityWrapper key={`step-${index}`} visible={activeStep === index}>
          {step.content}
        </VisibilityWrapper>
      ))}
    </Box>
  )
}
