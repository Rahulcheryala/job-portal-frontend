import React from 'react';

interface ButtonProps {
  cls?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export const Button = ({
  cls = 'btn',
  backgroundColor,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={cls}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      Button
    </button>
  );
};
