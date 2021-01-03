import React, {
  ChangeEvent,
  createContext,
  FormEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Validation } from '../protocols/validation';

interface FormHandlerProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children?: React.ReactNode;
  onSubmit: (data?: FormValues) => void;
  validation: Validation;
}

export type FormValues = {
  [field: string]: string | boolean | number;
};

export type FormErrors = {
  [field: string]: string;
};

type FormContextProps = {
  values: FormValues;
  errors: FormErrors;
  handleChangeField: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSetErrors: (fieldName: string, error: string) => void;
};

export const formContext = createContext<FormContextProps>(null);

export const FormHandler = ({
  children,
  onSubmit,
  validation,
  ...rest
}: FormHandlerProps): JSX.Element => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSetErrors = useCallback((fieldName: string, error: string) => {
    setErrors(currentErrors => ({
      ...currentErrors,
      [fieldName]: error,
    }));
  }, []);

  const handleChangeField = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValues(currentValues => ({
      ...currentValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      onSubmit(values);
    },
    [values, errors],
  );

  useEffect(() => {
    Object.keys(values).map(key => {
      handleSetErrors(key, validation.validate(key, values[key]));
    });
  }, [values, handleSetErrors]);

  return (
    <formContext.Provider
      value={{ values, errors, handleChangeField, handleSetErrors }}
    >
      <form {...rest} onSubmit={handleSubmit}>
        {children}
      </form>
    </formContext.Provider>
  );
};
