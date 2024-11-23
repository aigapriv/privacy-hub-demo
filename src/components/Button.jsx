import React from 'react';
import { theme } from '../styles/theme';

export const Button = ({ variant = 'primary', children, ...props }) => {
  const buttonStyles = {
    padding: theme.spacing[4],
    borderRadius: theme.spacing[2],
    backgroundColor: variant === 'primary' 
      ? theme.colors.primary.tealGreen 
      : theme.colors.primary.softPurple,
    color: theme.colors.text.light,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
  };

  return (
    <button style={buttonStyles} {...props}>
      {children}
    </button>
  );
}; 