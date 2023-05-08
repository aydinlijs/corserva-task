import { Radio, Typography } from '@mui/material'
import { StyledRadioButton, StyledRadioGroup } from './UIRadioGroup.styled'
import { UIRadioGroupProps } from './UIRadioGroup.interface'

export const UIRadioGroup = ({
  name,
  fields,
  value,
  onChange,
  manuallyChangeValue,
}: UIRadioGroupProps) => (
  <StyledRadioGroup>
    {fields.map((field) => (
      <StyledRadioButton
        key={field.value}
        onClick={() => {
          manuallyChangeValue(field.value)
        }}
        className={value === field.value ? 'selected' : ''}
        width={radioButtonSizeMap[fields.length]}
      >
        {field.icon}
        {field.label && (
          <Typography align="center" variant="body1">
            {field.label}
          </Typography>
        )}
        <Radio
          checked={value === field.value}
          onChange={onChange}
          value={field.value}
          name={name}
          inputProps={{ 'aria-label': field.value }}
        />
      </StyledRadioButton>
    ))}
  </StyledRadioGroup>
)

const radioButtonSizeMap = ['', '', '49%', '32%', '24%']
