import { Colors, Size } from '@/configs/styles'
import styled, { css } from 'styled-components'
import { FlexRow } from './Flex'

export const BaseMenu = styled.div`
  padding: 20px;
  background: #fff;
  box-shadow: 6px 6px 30px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  width: 300px;
`

export const BaseMenuItem = styled(FlexRow)<{
  selected?: boolean
}>`
  padding: 0 10px;
  height: 40px;
  color: ${Colors.text};
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: ${Size.baseBorderRadius}px;

  :hover {
    background-color: #f0f0f1;
  }

  ${(props) =>
    props.selected
      ? css`
          background-color: #f0f0f1;
        `
      : ''}
`

export const SwitcherMenu = styled(BaseMenu)`
  width: 300px;
  padding: 20px;
`

const itemSelectedCss = css`
  background-color: #f0f0f1;
  .icon-check {
    display: none;
  }
  .icon-action {
    display: flex;
  }
`

export const SwitcherMenuItem = styled(BaseMenuItem)`
  justify-content: space-between;
  height: 48px;

  .icon-action,
  .icon-check {
    margin-left: 8px;
  }

  .icon-action {
    display: none;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;

    img {
      width: 17px;
    }

    :hover {
      background-color: #e0e0e2;
    }

    ${(props) =>
      props.selected
        ? css`
            background-color: #e0e0e2;
          `
        : ''}
  }

  :hover {
    ${itemSelectedCss}
  }

  ${(props) => (props.selected ? itemSelectedCss : '')}
`
