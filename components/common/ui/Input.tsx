import React, { useMemo } from 'react';
import { css } from '@emotion/react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  inline?: boolean;
};

const wrapperStyle = css`
  width: 100%;
  height: 2.5rem;
  border-bottom: 2px solid var(--inputBorder);
  position: relative;
  align-items: flex-end;

  &:focus-within {
    border-color: var(--accent);
  }

  > input {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: 0 0.5rem;
    width: 100%;
    height: 2rem;
    overflow: hidden;
    outline: 0;
    color: var(--fg);

    + div {
      position: absolute;
      opacity: 0.5;
      transition: all 0.2s ease;
      pointer-events: none;
      top: 0.5rem;
      bottom: 0;
      left: 0.5rem;
      font-size: 1rem;
    }
    &:not(:placeholder-shown) + div,
    &:focus + div {
      font-size: 0.8rem;
      transform: translate(-4px, -1rem);
    }

    &:focus + div {
      color: var(--accent);
      opacity: 1;
    }
  }
`;

export const Input: React.VFC<InputProps> = (props) => {
  const {label, inline} = props;
  const displayStyle = useMemo(() => css`
    display: ${inline ? 'inline-flex' : 'flex'};
  `, [inline]);
  return (
    <div css={[wrapperStyle, displayStyle]}>
      <input {...props} placeholder=" " />
      <div>{label}</div>
    </div>
  );
};