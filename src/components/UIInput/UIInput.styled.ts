import styled from '@emotion/styled'
import { FormHelperText, TextField, outlinedInputClasses } from '@mui/material'

export const StyledHelperText = styled(FormHelperText)`
  margin-left: 0;
  color: red;
`

export const StyledInput = styled(TextField)(
  ({ invalid }: { invalid: boolean }) => `
  width: 100%;
  label {
    ${invalid ? 'color: red;' : ''}    
  }
  .${outlinedInputClasses.notchedOutline} {
    ${invalid ? 'border-color: red;' : ''}    
  }
  `
)
