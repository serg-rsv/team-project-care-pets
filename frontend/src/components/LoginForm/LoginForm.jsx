import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Button from '../Button';
import css from '../RegisterForm/authForm.module.scss';
import * as Yup from 'yup';
import { useLoginMutation } from '../../redux/services/usersSlice';
import { setToken } from '../../redux/services/authSlice';
import { toast } from 'react-toastify';

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
        .email('Email містить помилки')
        .required('Це поле не може бути порожнім'),
      password: Yup.string()
        .required('Це поле не може бути порожнім')
        .min(7, 'Пароль містить мінімум 7 символів')
        .max(32, 'Пароль містить максимум 32 символи'),
    }),
    onSubmit: async values => {
      try {
        const response = await login(values).unwrap();
        dispatch(setToken(response.data.token));
        formik.resetForm();
      } catch (error) {
        toast.error('Невірна електронна пошта або пароль.');
      }
    },
  });

  return (
    <div className={css.formBlock}>
      <h2 className={css.formTitle}>Вхід</h2>
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
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Пароль"
        />

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
          Увійти
        </Button>
      </form>
      <p className={css.linkToPage}>
        Ще не маєте аккаунту?{' '}
        <Link className={css.link} to="/register">
          Зареєструватися
        </Link>{' '}
      </p>
    </div>
  );
};

export default LoginForm;
