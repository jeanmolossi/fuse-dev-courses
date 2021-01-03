import React from 'react';
import MUButton, {
  ButtonProps as MUButtonProps,
} from '@material-ui/core/Button';
import styles from './styles.scss';

type ButtonProps = {
  children?: React.ReactNode;
} & MUButtonProps;

const Buttons = ({
  children,
  className,
  color = 'primary',
  variant = 'contained',
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <MUButton
      className={[styles[`${variant}-${color}-button`], className].join(' ')}
      variant={variant}
      {...rest}
    >
      {children}
    </MUButton>
  );
};

export default Buttons;
