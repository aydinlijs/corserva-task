import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { StyledInputLabel } from './UISelect.styled'
import React from 'react'

interface UISelectItem {
  value: string
  label: string
}
interface UISelectProps {
  items: UISelectItem[]
  value: string
  label: string
  id: string
  [key: string]: any
}

export const UISelect = ({
  items,
  onChange,
  value,
  id,
  label,
  ...args
}: UISelectProps) => {
  return (
    <>
      <StyledInputLabel htmlFor={`${id}-field`}>{label}</StyledInputLabel>
      <Select
        id={`${id}-field`}
        value={value}
        onChange={(event: SelectChangeEvent<string>) => {
          onChange(event)
        }}
        {...args}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
