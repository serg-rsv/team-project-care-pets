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
        .email('Email address is invalid')
        .required('Please enter'),
      password: Yup.string()
        .required('Please enter')
        .min(7, 'Password must be at least 7 characters')
        .max(32, 'Password must not exceed 32 characters'),
      confirmPassword: Yup.string()
        .required('Please enter')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
      name: Yup.string()
        .required('Please enter')
        .matches(/^[а-яА-ЯїЇіІЁёa-zA-Z]+$/, 'Name contain only letters'),
      location: Yup.string()
        .required('Please enter')
        .matches(
          /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/,
          'Enter by type: City, Region'
        ),
      phone: Yup.string()
        .required('Please enter')
        .matches(/^\+380\d{9}$/, 'Invalid phone number'),
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
      <h2 className={css.formTitle}>Registration</h2>
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
              placeholder="Password"
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
              placeholder="Confirm Password"
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
              placeholder="Name"
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
              placeholder="City, region"
            />
            {formik.values.location !== '' && formik.errors.location ? (
              <p className={css.inputErrorLocation}>{formik.errors.location}</p>
            ) : null}
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
              placeholder="Mobile phone"
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
              children="Next"
              onClick={moveNextRegistration}
              className={css.formBtn}
            />
          </div>
        )}
        {!isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children="Register"
              className={css.formBtn}
              buttonType="submit"
              disabled={isLoading}
            />
            <Button
              children="Back"
              className={css.formBtnBck}
              onClick={moveNextRegistration}
              disabled={isLoading}
            />
          </div>
        )}
      </form>

      {/* {isFirstRegisterStep && <button className={css.formBtn} type='button' onClick={moveNextRegistration}>Next</button>} */}

      <p className={css.linkToPage}>
        Already have an account?{' '}
        <Link className={css.link} to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
