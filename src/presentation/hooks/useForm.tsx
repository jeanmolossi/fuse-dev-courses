import React, {
  ChangeEvent,
  createContext,
  FormEvent,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Validation } from '@/presentation/protocols/validation';

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
  [field: string]: string[];
};

type FormContextProps = {
  values: FormValues;
  errors: FormErrors;
  handleChangeField: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSetErrors: (fieldName: string, errors: string[]) => void;
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

  const handleSetErrors = useCallback((fieldName: string, errors: string[]) => {
    setErrors(currentErrors => ({
      ...currentErrors,
      [fieldName]: errors,
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

export function useFormHandler(): FormContextProps {
  const context = useContext(formContext);

  return context;
}
