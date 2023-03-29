import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useLoginMutation } from '../../redux/services/usersSlice';
import { setToken } from '../../redux/services/authSlice';
import Button from '../Button';
import css from '../RegisterForm/authForm.module.scss';

const LoginForm = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [inputType, setInputType] = useState('password');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t('LoginForm.emailError'))
        .required(t('LoginForm.fieldCannotBeEmpty')),
      password: Yup.string()
        .required(t('LoginForm.fieldCannotBeEmpty'))
        .min(7, t('LoginForm.passwordMinimumCharacters'))
        .max(32, t('LoginForm.passwordMaximumCharacters')),
    }),
    onSubmit: async values => {
      try {
        const response = await login(values).unwrap();
        dispatch(setToken(response.data.token));
        formik.resetForm();
      } catch (error) {
        toast.error(t('LoginForm.invalidEmailOrPassword'));
      }
    },
  });
  const onBtnPasswordClick = () => {
    switch (inputType) {
      case 'password':
        setInputType('text');
        break;
      case 'text':
        setInputType('password');
        break;
      default:
        return;
    }
  };

  return (
    <div className={css.formBlock}>
      <h2 className={css.formTitle}>{t('LoginForm.login')}</h2>
      <form className={css.loginForm} onSubmit={formik.handleSubmit}>
        <input
          className={css.formInput}
          id="loginEmail"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />

        {formik.touched.email && formik.errors.email ? (
          <p className={css.inputLoginErrorEmail}>{formik.errors.email}</p>
        ) : null}

        <input
          className={css.formInput}
          id="loginPassword"
          name="password"
          type={inputType}
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('LoginForm.password')}
        />
        <button
          className={css.bntLookLogin}
          type="button"
          onClick={onBtnPasswordClick}
        >
          <svg
            className={css.lookBtn__icon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 488.85 488.85"
          >
            <path d="M244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z" />
          </svg>
        </button>

        {formik.touched.password && formik.errors.password ? (
          <p className={css.inputLoginErrorPassword}>
            {formik.errors.password}
          </p>
        ) : null}

        <Button
          className={css.formBtn}
          buttonType="submit"
          disabled={isLoading}
        >
          {t('LoginForm.signIn')}
        </Button>
      </form>
      <p className={css.linkToPage}>
        {t('LoginForm.dontHaveAccount')}{' '}
        <Link className={css.link} to="/register">
          {t('LoginForm.register')}
        </Link>{' '}
      </p>
    </div>
  );
};

export default LoginForm;
