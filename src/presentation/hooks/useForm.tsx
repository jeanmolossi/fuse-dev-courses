import React, {
  ChangeEvent,
  createContext,
  FormEvent,
  HTMLAttributes,
  useCallback,
  useState,
} from 'react';

interface FormHandlerProps
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children?: React.ReactNode;
  onSubmit: (data?: FormValues) => void;
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
  ...rest
}: FormHandlerProps): JSX.Element => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChangeField = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValues(currentValues => ({
      ...currentValues,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  }, []);

  const handleSetErrors = useCallback((fieldName: string, error: string) => {
    setErrors(currentErrors => ({
      ...currentErrors,
      [fieldName]: error,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      onSubmit(values);
    },
    [values, errors],
  );

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
