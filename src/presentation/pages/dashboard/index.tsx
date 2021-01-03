import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './styles.scss';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <Typography>Hello World from Dashboard</Typography>
    </div>
  );
};

export default Dashboard;
