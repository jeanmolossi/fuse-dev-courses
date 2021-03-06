import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { TextInput, Button } from '@/presentation/components';
import { FormHandler, useFormHandler } from '@/presentation/hooks/useForm';
import { Validation } from '@/presentation/protocols/validation';
import styles from './styles.scss';

type LoginProps = {
  validation: Validation;
};

const Login = ({ validation }: LoginProps): JSX.Element => {
  return (
    <div className={styles.login}>
      <div className={styles.flex__cards}>
        <Card square>
          <CardContent className={styles.card__content}>
            <Typography variant="h6">Acesse sua conta</Typography>

            <FormHandler
              onSubmit={data => {
                console.log(data);
              }}
              className={styles.form__section}
              validation={validation}
            >
              <TextInput
                name="email"
                label="Email"
                type="email"
                required
                variant="outlined"
                autoComplete="off"
              />

              <TextInput
                name="password"
                label="Senha"
                type="password"
                required
                variant="outlined"
                autoComplete="off"
              />

              <div className={styles.password__remeber}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="remember"
                        checked={true}
                        onChange={() => {
                          //
                        }}
                      />
                    }
                    label="Manter-me logado"
                  />
                </FormControl>

                <Link to="/pages/auth/forgot-password">
                  Esqueceu sua senha?
                </Link>
              </div>

              <SubmitButton />
            </FormHandler>

            <div className={styles.form__divider}>
              <Divider light />
              <span>OU</span>
              <Divider light />
            </div>

            <div className={styles.buttons_container}>
              <Button variant="outlined" color="primary" size="small">
                Acesse com o Google
              </Button>

              <Button variant="outlined" color="primary" size="small">
                Acesse com o Facebook
              </Button>
            </div>

            <div className={styles.register__section}>
              <span>Ainda não tem uma conta?</span>
              <Link to="/pages/auth/register">Crie uma conta</Link>
            </div>
          </CardContent>
        </Card>

        <Card square>
          <CardContent className={styles.hero_section}>
            <Typography variant="h3">Bem vindo a FUSE Code</Typography>

            <Typography variant="subtitle1">
              Poderosa plataforma de ensino online. Uma solução web para
              desenvolvedores web.
            </Typography>

            <Typography>Aprenda, crie e projete!</Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SubmitButton = () => {
  const { isInvalidForm, isSubmitting } = useFormHandler();
  return (
    <Button
      variant="contained"
      color="primary"
      aria-label="Entrar"
      disabled={isInvalidForm || isSubmitting}
      fullWidth
      type="submit"
      data-testid="submit-button"
      startIcon={
        isSubmitting ? (
          <CircularProgress color="secondary" size={18} />
        ) : undefined
      }
    >
      Entrar
    </Button>
  );
};

export default Login;
