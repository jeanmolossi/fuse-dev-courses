import React, { useState } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import styles from './styles.scss';

type TextInputProps = {
  name: string;
  label?: string;
  fullWidth?: boolean;
} & TextFieldProps;

const TextInput = ({
  name,
  label,
  type = 'text',
  className = '',
  variant = 'outlined',
  autoFocus,
  required = false,
  fullWidth = true,
  ...rest
}: TextInputProps): JSX.Element => {
  const [value, setValue] = useState('');

  return (
    <TextField
      className={[styles.input_label, className].join(' ')}
      label={label}
      type={type}
      name={name}
      value={value}
      variant={variant}
      autoFocus={autoFocus}
      required={required}
      fullWidth={fullWidth}
      onChange={e => {
        setValue(e.target.value);
      }}
      {...rest}
    />
  );
};

export default TextInput;
