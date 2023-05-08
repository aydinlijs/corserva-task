import { UIInputProps } from './UIInput.interface'
import { StyledHelperText, StyledInput } from './UIInput.styled'

export const UIInput = ({
  label,
  id,
  helperText,
  handleChange,
  handleBlur,
  ...args
}: UIInputProps) => {
  const isInvalid = Boolean(helperText)
  return (
    <div className="ui-input">
      <StyledInput
        invalid={isInvalid}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby={`${id}-helper-text`}
        label={label}
        id={id}
        variant="outlined"
        {...args}
      />
      {isInvalid && (
        <StyledHelperText id={`${id}-helper-text`}>
          {helperText}
        </StyledHelperText>
      )}
    </div>
  )
}
