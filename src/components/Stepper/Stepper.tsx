import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Stepper from '@mui/material/Stepper'
import * as React from 'react'
import { DeliveryDetailsForm } from '../Forms/DeliveryDetailsForm'
import { PaymentOptionsForm } from '../Forms/PaymentOptions/PaymentOptionsForm'
import { PersonalInformationForm } from '../Forms/PersonalInformationForm'
import { VisibilityWrapper } from '../VisibilityWrapper'
import { DetailsReview } from '../Forms/DetailsReview/DetailsReview'

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [amount, setAmount] = React.useState(581.45)
  const [initialData, setInitialData] = React.useState([
    { email: '', name: '', surname: '' },
    {
      deliveryOption: 'pick-up',
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      city: '',
      zip: '',
      country: '',
    },
    {
      paymentOption: 'credit-card',
      cardNumber: '',
      securityCode: '',
      expirationDate: '',
    },
  ])

  const handleDataUpdate = (data: any, index: number) => {
    setInitialData((prev: any) => {
      const updated = [...prev]
      updated[index] = data
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

  const steps = React.useMemo(
    () => [
      {
        label: 'Personal information',
        content: (
          <PersonalInformationForm
            initialValues={initialData[0]}
            amount={amount}
            onSubmit={(values: any) => {
              handleDataUpdate(values, 0)
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
            initialValues={initialData[1]}
            onSubmit={(values: any) => {
              handleDataUpdate(values, 1)
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
            initialValues={initialData[2]}
            amount={amount}
            onGoBack={onGoBack}
            onSubmit={(values: any) => {
              handleDataUpdate(values, 2)
              setActiveStep((step) => ++step)
            }}
          />
        ),
      },
      {
        label: 'Review',
        content: (
          <DetailsReview amount={amount} onGoBack={onGoBack} {...initialData} />
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
