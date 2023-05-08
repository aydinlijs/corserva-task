import styled from '@emotion/styled'

export const VisibilityWrapper = styled.div(
  ({ visible }: { visible: boolean }) => `
  ${
    visible
      ? ''
      : `
        display: none;
      `
  }
`
)
