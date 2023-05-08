import styled from '@emotion/styled'
import { radioClasses } from '@mui/material'

export const StyledRadioButton = styled.div(
  ({ width }: { width: string }) => `
  width: ${width};
  height: 120px;
  background-color: white;
  border: 2px solid gray;
  cursor: pointer;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;

  &.selected {
    border-color: blue;
  }
  .${radioClasses.root} {
    visibility: hidden;
    width: 0;
    height: 0;
    padding: 0;
  }
  `
)

export const StyledRadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
`
