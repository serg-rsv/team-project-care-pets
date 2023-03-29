import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRegisterMutation } from '../../redux/services/usersSlice';
import { setToken } from '../../redux/services/authSlice';
import Button from '../Button/Button';
import css from './authForm.module.scss';

const RegisterForm = () => {
  const { t } = useTranslation('common');
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState('password');

  //function to next step registration
  const moveNextRegistration = () => {
    isFirstRegisterStep
      ? setIsFirstRegisterStep(false)
      : setIsFirstRegisterStep(true);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      location: '',
      phone: '',
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t('RegisterForm.invalidEmail'))
        .required(t('RegisterForm.requiredField')),
      password: Yup.string()
        .trim()
        .required(t('RegisterForm.requiredField'))
        .min(7, t('RegisterForm.passwordMinLength'))
        .max(32, t('RegisterForm.passwordMaxLength')),
      confirmPassword: Yup.string()
        .required(t('RegisterForm.requiredField'))
        .oneOf([Yup.ref('password'), null], t('RegisterForm.passwordMismatch')),
      name: Yup.string()
        .required(t('RegisterForm.requiredField'))
        .matches(/^[а-яА-ЯїЇіІЁёa-zA-Z]+$/, t('RegisterForm.lettersOnly')),
      location: Yup.string()
        .required(t('RegisterForm.requiredField'))
        .matches(
          /[А-Яа-яЁёЇїІіЄєҐґ'a-zA-Z]{2,},? ([А-Яа-яЁёЇїІіЄєҐґ'a-zA-Z]+(?: [А-Яа-яЁёЇїІіЄєҐґ'a-zA-Z]+)*)+$/,
          t('RegisterForm.cityFormat')
        ),
      phone: Yup.string()
        .required(t('RegisterForm.requiredField'))
        .matches(/^\+380\d{9}$/, t('RegisterForm.invalidPhoneNumber')),
    }),

    onSubmit: async ({ email, password, name, phone, location }) => {
      try {
        const {
          data: { token },
        } = await register({
          email,
          password,
          name,
          phone,
          location,
        });

        dispatch(setToken(token));
        navigate('/home');
        formik.resetForm();
      } catch (error) {
        toast.error(t('RegisterForm.registrationError'));
      }
    },
  });

  useEffect(() => {
    const firstStepPossibleErrors = ['email', 'password', 'confirmPassword'];
    const isValidFieldsInFirstStep = !Object.keys(formik.errors).some(error =>
      firstStepPossibleErrors.includes(error)
    );
    isValidFieldsInFirstStep && formik.values.email.length > 0
      ? setDisableNextButton(false)
      : setDisableNextButton(true);
  }, [formik, disableNextButton]);

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
      <h2 className={css.formTitle}>{t('RegisterForm.registration')}</h2>
      <form className={css.registerForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <input
              className={css.formInput}
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />

            {formik.values.email !== '' && formik.errors.email ? (
              <p className={css.inputErrorEmail}>{formik.errors.email}</p>
            ) : null}
            {formik.touched.email && formik.errors.email ? (
              <p className={css.inputErrorEmail}>{formik.errors.email}</p>
            ) : null}

            <input
              className={css.formInput}
              id="password"
              name="password"
              type={inputType}
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder={t('RegisterForm.password')}
            />
            <button
              className={css.bntLook}
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
            {formik.values.password !== '' && formik.errors.password ? (
              <p className={css.inputErrorPassword}>{formik.errors.password}</p>
            ) : null}
            {formik.touched.password && formik.errors.password ? (
              <p className={css.inputErrorPassword}>{formik.errors.password}</p>
            ) : null}

            <input
              className={css.formInput}
              id="confirmPassword"
              name="confirmPassword"
              type={inputType}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              placeholder={t('RegisterForm.confirmPassword')}
            />
            <button
              className={css.bntLookConfirm}
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
            {formik.values.confirmPassword !== '' &&
            formik.errors.confirmPassword ? (
              <p className={css.inputErrorConfirmPassword}>
                {formik.errors.confirmPassword}
              </p>
            ) : null}
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className={css.inputErrorConfirmPassword}>
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <input
              className={css.formInput}
              id="name"
              name="name"
              type="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('RegisterForm.firstName')}
            />
            {formik.values.name !== '' && formik.errors.name ? (
              <p className={css.inputErrorName}>{formik.errors.name}</p>
            ) : null}
            {formik.touched.name && formik.errors.name ? (
              <p className={css.inputErrorName}>{formik.errors.name}</p>
            ) : null}

            <input
              className={css.formInput}
              id="location"
              name="location"
              type="location"
              onChange={formik.handleChange}
              value={formik.values.location}
              placeholder={t('RegisterForm.cityRegion')}
            />
            {formik.touched.location && formik.errors.location ? (
              <p className={css.inputErrorLocation}>{formik.errors.location}</p>
            ) : null}

            <input
              className={css.formInput}
              id="phone"
              name="phone"
              type="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder={t('RegisterForm.phoneNumber')}
            />
            {formik.values.phone !== '' && formik.errors.phone ? (
              <p className={css.inputErrorPhone}>{formik.errors.phone}</p>
            ) : null}
            {formik.touched.phone && formik.errors.phone ? (
              <p className={css.inputErrorPhone}>{formik.errors.phone}</p>
            ) : null}
          </>
        )}

        {isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children={t('RegisterForm.next')}
              onClick={moveNextRegistration}
              className={css.formBtn}
              disabled={disableNextButton}
            />
          </div>
        )}
        {!isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children={t('RegisterForm.register')}
              className={css.formBtn}
              buttonType="submit"
              disabled={isLoading}
            />
            <Button
              children={t('RegisterForm.back')}
              className={css.formBtnBck}
              onClick={moveNextRegistration}
              disabled={isLoading}
            />
          </div>
        )}
      </form>
      <p className={css.linkToPage}>
        {t('RegisterForm.haveAccount')}{' '}
        <Link className={css.link} to="/login">
          {t('RegisterForm.login')}
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
