import React from 'react'
import styled, { css } from 'styled-components'

const Button = ({ content, round, fullWidth, size, color, hoverEffect }) => {
  return (
    <ButtonWrapper
      round={round}
      fullWidth={fullWidth}
      size={size}
      color={color}
      hoverEffect={hoverEffect}
    >
      {content}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-weight: bold;

  ${({ round }) =>
    round &&
    css`
      padding: 2rem;
      border-radius: 50px;
    `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

    ${({ size }) =>
    size === 'big' &&
    css`
      width: 39rem;
      font-size: 4rem;
    `}

  /* COLORS */

  ${({ color }) =>
    color === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.dark};
    `}

    ${({ color }) =>
    color === 'red' &&
    css`
      background-color: ${({ theme }) => theme.colors.red};
      color: ${({ theme }) => theme.colors.dark};
    `}

    ${({ color }) =>
    color === 'grey' &&
    css`
      background-color: ${({ theme }) => theme.colors.grey.main};
      color: ${({ theme }) => theme.colors.dark};
    `}

    ${({ color }) =>
    color === 'dark' &&
    css`
      background-color: ${({ theme }) => theme.colors.dark};
      color: ${({ theme }) => theme.colors.light};
    `}

  /* HOVER EFFECTS */

  ${({ hoverEffect }) =>
    hoverEffect === 'scale' &&
    css`
      transition: transform 0.15s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }

      &:active {
        transform: scale(1.02);
      }
    `}

  ${({ hoverEffect }) =>
    hoverEffect === 'color' &&
    css`
      transition: background-color 0.15s ease-in-out;

      ${({ color }) =>
        color === 'primary' &&
        css`
          &:hover {
            background-color: ${({ theme }) => theme.colors.hover.primary};
          }

          &:active {
            background-color: ${({ theme }) => theme.colors.active.primary};
            transition: background-color 0.05s ease-in-out;
          }
        `}

      ${({ color }) =>
        color === 'red' &&
        css`
          &:hover {
            background-color: ${({ theme }) => theme.colors.hover.red};
          }

          &:active {
            background-color: ${({ theme }) => theme.colors.active.red};
            transition: background-color 0.05s ease-in-out;
          }
        `}

        ${({ color }) =>
        color === 'grey' &&
        css`
          &:hover {
            background-color: ${({ theme }) => theme.colors.hover.grey};
          }

          &:active {
            background-color: ${({ theme }) => theme.colors.active.grey};
            transition: background-color 0.05s ease-in-out;
          }
        `}
    `}
`

export default Button
