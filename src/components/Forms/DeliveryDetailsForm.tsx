import { Divider, FormControl, Grid, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { UIInput } from '../UIInput/UIInput'
import { UIRadioGroup } from '../UIRadioGroup/UIRadioGroup'
import { UISelect } from '../UISelect/UISelect'
import { VisibilityWrapper } from '../VisibilityWrapper'
import { FormFooter } from './FormFooter/FormFooter'
import { deliveryOptions } from './Shared'
import { DeliveryInformation } from '../OrderStepper/OrderStepper.interface'

const PickupSchema = yup.object().shape({
  deliveryOption: yup.string(),
})

const DeliverySchema = yup.object().shape({
  deliveryOption: yup.string(),
  lineOne: yup.string().required('This field is required'),
  lineTwo: yup.string().optional(),
  lineThree: yup.string().optional(),
  city: yup.string().optional(),
  zip: yup.string().required('This field is required'),
  country: yup.string().required('This field is required'),
})

export const DeliveryDetailsForm = ({
  onSubmit,
  onGoBack,
  amount,
  initialValues,
}: {
  onSubmit: (values: DeliveryInformation) => void
  onGoBack: () => void
  amount: number
  initialValues: DeliveryInformation
}) => {
  const [isPickUp, setIsPickUp] = useState(true)
  const [listOfCountries, setListOfCountries] = useState([])
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((res) => {
        setListOfCountries(res)
      })
  })
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isPickUp ? PickupSchema : DeliverySchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false)
        }, 400)
        onSubmit(values)
      }}
    >
      {({
        errors,
        values,
        touched,
        isSubmitting,
        handleSubmit,
        setFieldValue,
        ...fieldProps
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography
            sx={{ marginTop: '20px', marginBottom: '10px' }}
            variant="h5"
          >
            Delivery Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <UIRadioGroup
                  fields={deliveryOptions}
                  value={values.deliveryOption}
                  name="deliveryOption"
                  manuallyChangeValue={(value: string) => {
                    setFieldValue('deliveryOption', value)
                    setIsPickUp(value === 'pick-up')
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    fieldProps.handleChange(event)
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <VisibilityWrapper visible={!isPickUp}>
            <Divider sx={{ marginBlock: '10px' }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <UIInput
                    name="lineOne"
                    label="Address line one"
                    id="address-line-one-field"
                    value={values.lineOne}
                    disabled={isPickUp}
                    helperText={
                      (errors.lineOne && touched.lineOne
                        ? errors.lineOne
                        : '') as string
                    }
                    {...fieldProps}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <UIInput
                    name="lineTwo"
                    label="Address line two"
                    id="address-line-two-field"
                    disabled={isPickUp}
                    value={values.lineTwo}
                    {...fieldProps}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <UIInput
                    name="lineThree"
                    label="Address line three"
                    id="address-line-three-field"
                    disabled={isPickUp}
                    value={values.lineThree}
                    {...fieldProps}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <UIInput
                    name="city"
                    label="City"
                    id="city-field"
                    value={values.city}
                    disabled={isPickUp}
                    helperText={
                      (errors.city && touched.city ? errors.city : '') as string
                    }
                    {...fieldProps}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <UIInput
                    name="zip"
                    label="Zip Code"
                    id="zip-code-field"
                    value={values.zip}
                    disabled={isPickUp}
                    helperText={
                      (errors.zip && touched.zip ? errors.zip : '') as string
                    }
                    {...fieldProps}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <UISelect
                    id="country"
                    name="country"
                    label="Country"
                    value={values.country}
                    disabled={isPickUp}
                    onChange={fieldProps.handleChange}
                    items={listOfCountries.map((country: any) => ({
                      value: country.area,
                      label: country.name.common,
                    }))}
                  ></UISelect>
                </FormControl>
              </Grid>
            </Grid>
          </VisibilityWrapper>
          <VisibilityWrapper visible={isPickUp}>
            <Divider sx={{ marginBlock: '10px' }} />
            <Grid container>
              <Typography sx={{ marginBlock: '5px' }} variant="body1">
                After 10am tomorrow, you can pick up your package at one of our
                following locations:
              </Typography>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                <li>
                  <Typography variant="body2">
                    - Downing street 10 (10 am to 18 pm)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    - Baker Street 221B (10 am to 18 pm)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    - Anderson Peek, 589 (11 am to 17 pm)
                  </Typography>
                </li>
              </ul>
            </Grid>
          </VisibilityWrapper>

          <FormFooter
            onGoBack={onGoBack}
            amount={amount}
            disableContinue={
              isSubmitting ||
              (!isPickUp &&
                Boolean(
                  Object.keys(errors).length || !Object.keys(touched).length
                ))
            }
          />
        </form>
      )}
    </Formik>
  )
}
