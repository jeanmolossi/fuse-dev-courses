import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useFormHandler } from '@/presentation/hooks/useForm';
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
  onChange,
  helperText = '',
  ...rest
}: TextInputProps): JSX.Element => {
  const { handleChangeField, values, errors } = useFormHandler();

  return (
    <TextField
      className={[styles.input_label, className].join(' ')}
      label={label}
      type={type}
      name={name}
      value={values[name] || ''}
      variant={variant}
      autoFocus={autoFocus}
      required={required}
      fullWidth={fullWidth}
      {...rest}
      error={!!errors[name]?.[0]}
      helperText={
        helperText || (errors[name]?.[0] ? errors[name]?.[0] : helperText)
      }
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeField(e);
        if (onChange) {
          onChange(e);
        }
      }}
      data-testid={`${name}-${type}-field`}
    />
  );
};

export default TextInput;
