import styled from '@emotion/styled'
import { InputLabel, formLabelClasses } from '@mui/material'

export const StyledInputLabel = styled(InputLabel)(
  () => `
  &.${formLabelClasses.filled}, &.${formLabelClasses.focused} {
    visibility: hidden;
  }
`
)
