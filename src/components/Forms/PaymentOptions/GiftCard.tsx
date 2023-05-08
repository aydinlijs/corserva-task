import { Button, FormHelperText, Grid, TextField } from '@mui/material'
import { useState } from 'react'

interface GiftCardProps {
  onApply: (value: string) => void
}
export const GiftCard = ({ onApply }: GiftCardProps) => {
  const [code, setCode] = useState('')

  return (
    <Grid display="flex" gap="5px" flexDirection="column">
      <Grid display="flex" gap="10px">
        <TextField
          value={code}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCode(event.target.value)
          }}
          id="coupon-code"
          label="Gift card code"
          variant="outlined"
        />

        <Button
          size="medium"
          onClick={() => {
            onApply(code)
          }}
          type="button"
          variant="outlined"
        >
          Apply
        </Button>
      </Grid>

      <FormHelperText>
        Hint: each letter in the code means 10% off
      </FormHelperText>
    </Grid>
  )
}
