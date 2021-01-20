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
  onSubmit: (data?: FormValues) => Promise<void> | void;
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
  isInvalidForm: boolean;
  isSubmitting: boolean;
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
  const [isInvalidForm, setIsInvalidForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.log(error);
      }
      setIsSubmitting(false);
    },
    [values, errors],
  );

  useEffect(() => {
    Object.keys(values).map(key => {
      handleSetErrors(key, validation.validate(key, values[key]));
    });
  }, [values, handleSetErrors]);

  useEffect(() => {
    Object.keys(errors).forEach(errorKey => {
      errors[errorKey].length
        ? setIsInvalidForm(true)
        : setIsInvalidForm(false);
    });
  }, [errors]);

  return (
    <formContext.Provider
      value={{
        values,
        errors,
        isInvalidForm,
        isSubmitting,
        handleChangeField,
        handleSetErrors,
      }}
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
