export interface UIRadioButton {
  value: string
  icon: JSX.Element
  label: string
}

export interface UIRadioGroupProps {
  value: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  manuallyChangeValue: (value: string) => void
  fields: UIRadioButton[]
}
