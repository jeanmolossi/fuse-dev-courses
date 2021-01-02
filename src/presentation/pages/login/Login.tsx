import React from 'react';
import styles from './styles.scss';

const Login = (): JSX.Element => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <img src="" alt="" />
        <h1>Plataforma</h1>
      </header>

      <div className={styles.form}>Form</div>

      <footer className={styles.footer}>footer</footer>
    </div>
  );
};

export default Login;
