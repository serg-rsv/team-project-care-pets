import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import css from './authForm.module.scss';
import * as Yup from 'yup';
import Button from '../Button/Button';
const { useNavigate } = require('react-router-dom');
const { useRegisterMutation } = require('../../redux/services/usersSlice');
const { useDispatch } = require('react-redux');
const { setToken } = require('../../redux/services/authSlice');

const RegisterForm = () => {
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        .email('Неправильний адрес')
        .required('Це поле не може бути порожнім'),
      password: Yup.string()
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
          /([а-яА-ЯїЇіІЁёa-zA-Z]+(?: [а-яА-ЯїЇіІЁёa-zA-Z]+)*),? ([а-яА-ЯїЇіІЁёa-zA-Z]{2})/,
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
      } catch {
        alert.error('Something went wrong. Maybe this email is already in use');
      }
      formik.resetForm();
    },
  });

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
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Пароль"
            />
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
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              placeholder="Підтвердження пароля"
            />
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

      {/* {isFirstRegisterStep && <button className={css.formBtn} type='button' onClick={moveNextRegistration}>Next</button>} */}

      <p className={css.linkToPage}>
        Ви вже маєте аккаунт?{' '}
        <Link className={css.link} to="/login">
          Увійти
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
