import { FormControl, Grid, Typography } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { UIInput } from '../UIInput/UIInput'
import { FormFooter } from './FormFooter/FormFooter'
import { PersonalInformation } from '../OrderStepper/OrderStepper.interface'

const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Entered name is too short')
    .max(50, 'Entered name is too long')
    .required('This field is required'),
  surname: yup
    .string()
    .min(2, 'Entered surname is too short')
    .max(50, 'Entered surname is too long')
    .required('This field is required'),
  email: yup.string().email('Invalid email').required('This field is required'),
})

export const PersonalInformationForm = ({
  onSubmit,
  amount,
  initialValues,
}: {
  onSubmit: (values: PersonalInformation) => void
  amount: number
  initialValues: PersonalInformation
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
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
        ...fieldProps
      }) => (
        <form onSubmit={handleSubmit}>
          <Typography
            sx={{ marginTop: '20px', marginBottom: '10px' }}
            variant="h5"
          >
            Personal Information
          </Typography>
          <Grid justifyContent="center" container spacing={2}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <UIInput
                  name="name"
                  label="Name"
                  id="name-field"
                  value={values.name}
                  helperText={
                    (errors.name && touched.name ? errors.name : '') as string
                  }
                  {...fieldProps}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <UIInput
                  name="surname"
                  label="Surname"
                  id="surname-field"
                  value={values.surname}
                  helperText={
                    (errors.surname && touched.surname
                      ? errors.surname
                      : '') as string
                  }
                  {...fieldProps}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <UIInput
                  name="email"
                  label="Email address"
                  id="email-field"
                  value={values.email}
                  helperText={
                    (errors.email && touched.email
                      ? errors.email
                      : '') as string
                  }
                  {...fieldProps}
                />
              </FormControl>
            </Grid>
          </Grid>
          <FormFooter
            amount={amount}
            disableContinue={
              isSubmitting ||
              Boolean(
                Object.keys(errors).length || !Object.keys(touched).length
              )
            }
          />
        </form>
      )}
    </Formik>
  )
}
