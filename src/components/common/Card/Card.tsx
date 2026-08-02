import React from 'react';
import styles from '../../../styles/common/Card.module.scss';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className
}) => {
  return (
    <div className={clsx(styles.card, className)}>
      {(title || action) && (
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
