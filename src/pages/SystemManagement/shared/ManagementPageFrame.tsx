import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Card } from '../../../components/common/Card/Card';
import styles from '../../../styles/systemManagement/ManagementPageFrame.module.scss';

interface ManagementPageFrameProps {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
  actionLabel: string;
}

export const ManagementPageFrame: React.FC<ManagementPageFrameProps> = ({ title, description, columns, rows, actionLabel }) => (
  <section className={styles.page}>
    <div className={styles.header}>
      <div><p className={styles.eyebrow}>SYSTEM MANAGEMENT</p><h1>{title}</h1><p className={styles.subtitle}>{description}</p></div>
      <div className={styles.headerActions}><button className={styles.searchButton} type="button"><Search size={15} /> Search</button><button className={styles.primaryButton} type="button"><Plus size={15} /> {actionLabel}</button></div>
    </div>
    <Card title={title} subtitle={`${rows.length} records`}>
      <div className={styles.tableWrap}><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={`${title}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>
    </Card>
  </section>
);
