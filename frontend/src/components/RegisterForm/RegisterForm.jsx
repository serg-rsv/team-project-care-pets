import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import css from './authForm.module.scss';
import * as Yup from 'yup';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
const { useNavigate } = require('react-router-dom');
const { useRegisterMutation } = require('../../redux/services/usersSlice');
const { useDispatch } = require('react-redux');
const { setToken } = require('../../redux/services/authSlice');

const RegisterForm = () => {
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
        .email('Неправильний поштовий адрес')
        .required('Це поле не може бути порожнім'),
      password: Yup.string()
        .trim()
        .required('Це поле не може бути порожнім')
        .min(7, 'Пароль містить мінімум 7 символів')
        .max(32, 'Пароль містить максимум 32 символи'),
      confirmPassword: Yup.string()
        .required('Це поле не може бути порожнім')
        .oneOf([Yup.ref('password'), null], 'Пароль не співпадає'),
      name: Yup.string()
        .required('Це поле не може бути порожнім')
        .matches(/^[а-яА-ЯїЇіІЁёa-zA-Z]+$/, 'Тільки літери'),
      location: Yup.string()
        .required('Це поле не може бути порожнім')
        .matches(
          /[А-Яа-яЁёЇїІіЄєҐґ'a-zA-Z]{2,},? ([А-Яа-яЁёЇїІіЄєҐґ'a-zA-Z]+(?: [А-Яа-яЁёЇїІіЄєҐґ'a-zA-Z]+)*)+$/,
          'Введіть в форматі: місто, область'
        ),
      phone: Yup.string()
        .required('Це поле не може бути порожнім')
        .matches(/^\+380\d{9}$/, 'Неправильний номер телефону'),
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
        toast.error(
          'Щось пішло не так. Можливо користувач з такою електронною поштою вже існує.'
        );
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
      <h2 className={css.formTitle}>Реєстрація</h2>
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
              placeholder="Пароль"
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
              placeholder="Підтвердження пароля"
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
              placeholder="Ім'я"
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
              placeholder="Місто, область"
            />
            {/* {formik.values.location !== '' && formik.errors.location ? (
              <p className={css.inputErrorLocation}>{formik.errors.location}</p>
            ) : null} */}
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
              placeholder="Номер телефону"
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
              children="Далі"
              onClick={moveNextRegistration}
              className={css.formBtn}
              disabled={disableNextButton}
            />
          </div>
        )}
        {!isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children="Зареєструватися"
              className={css.formBtn}
              buttonType="submit"
              disabled={isLoading}
            />
            <Button
              children="Назад"
              className={css.formBtnBck}
              onClick={moveNextRegistration}
              disabled={isLoading}
            />
          </div>
        )}
      </form>
      <p className={css.linkToPage}>
        Ви вже маєте акаунт?{' '}
        <Link className={css.link} to="/login">
          Увійти
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
