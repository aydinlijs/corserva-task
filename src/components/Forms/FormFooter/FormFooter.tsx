import { Button, Divider, Grid, Typography } from '@mui/material'

interface FormFooterProps {
  label?: string
  amount: number
  onGoBack?: () => void
  disableContinue: boolean
}

export const FormFooter = ({
  label,
  amount,
  onGoBack,
  disableContinue,
}: FormFooterProps) => (
  <>
    <Divider sx={{ marginBlock: '20px' }} />
    <Grid display="flex" justifyContent="flex-end" sx={{ marginBlock: '20px' }}>
      <Typography variant="body1">
        Total amount is: <b>{amount}$</b>
      </Typography>
    </Grid>
    <Grid display="flex" justifyContent="flex-end" gap="10px">
      {onGoBack && (
        <Button
          onClick={onGoBack}
          size="large"
          type="button"
          variant="outlined"
        >
          Go back
        </Button>
      )}
      <Button
        size="large"
        type="submit"
        variant="contained"
        disabled={disableContinue}
      >
        {label || 'Save and continue'}
      </Button>
    </Grid>
  </>
)
