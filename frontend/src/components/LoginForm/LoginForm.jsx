import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Button from '../Button';
import css from '../RegisterForm/authForm.module.scss';
import * as Yup from 'yup';
import { useLoginMutation } from '../../redux/services/usersSlice';
import { setToken } from '../../redux/services/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email address is invalid')
        .required('Please enter'),
      password: Yup.string()
        .required('Please enter')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
    }),
    onSubmit: async values => {
      const response = await login(values).unwrap();
      dispatch(setToken(response.data.token));

      formik.resetForm();
    },
  });

  return (
    <div className={css.formBlock}>
      <h2 className={css.formTitle}>Login</h2>
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

        {formik.values.email !== '' && formik.errors.email ? (
          <p className={css.inputLoginErrorEmail}>{formik.errors.email}</p>
        ) : null}

        <input
          className={css.formInput}
          id="loginPassword"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />

        {formik.values.password !== '' && formik.errors.password ? (
          <p className={css.inputLoginErrorPassword}>
            {formik.errors.password}
          </p>
        ) : null}

        <Button
          className={css.formBtn}
          buttonType="submit"
          disabled={isLoading}
        >
          Login
        </Button>
      </form>
      <p className={css.linkToPage}>
        Don't have an account?{' '}
        <Link className={css.link} to="/register">
          Register
        </Link>{' '}
      </p>
    </div>
  );
};

export default LoginForm;
