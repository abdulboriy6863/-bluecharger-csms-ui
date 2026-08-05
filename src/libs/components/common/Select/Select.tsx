import React from 'react';
import styles from '../../../../scss/common/Select.module.scss';
import { ChevronDown } from 'lucide-react';
import type { SelectProps } from '../../../types/common/commonComponents';

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  className,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectContainer}>
        <select className={styles.select} {...props}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className={styles.arrow} />
      </div>
    </div>
  );
};
