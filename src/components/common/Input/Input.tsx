import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  className,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          className={clsx(styles.input, icon && styles.hasIcon, className)}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
