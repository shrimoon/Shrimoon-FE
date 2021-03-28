import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  danger?: boolean;
  inline?: boolean;
};

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-weight: bold;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  transition: all 0.2s ease;

  &.primary {
    background: var(--accent);
    color: var(--accentFg);
  }
  &.danger {
    background: var(--danger);
    color: var(--dangerFg);
    border-color: var(--danger);
  }
  &:focus {
    filter: brightness(150%);
  }
  &:disabled {
    background: transparent;
    border-color: var(--fg);
    color: var(--fg);
    font-weight: normal;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = (props) => {
  const {primary, danger, inline} = props;
  const className = useMemo(() => primary ? 'primary' : danger ? 'danger' : '', [primary, danger, inline]);
  return (
    <StyledButton {...props} className={className}>{props.children}</StyledButton>
  );
};