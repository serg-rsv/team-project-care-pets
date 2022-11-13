import { useFormik } from 'formik';
import css from './authForm.module.scss'
import * as Yup from 'yup';

const LoginForm = () => {
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
                .min(6, "Password must be at least 6 characters")
                .max(40, "Password must not exceed 40 characters"),
        }),
        onSubmit: (values) => {
       
            alert(JSON.stringify(values, null, 2));
         
            formik.resetForm()
        },
    });

  
    return (
        <div className={css.formBlock}>
            <h2 className={css.formTitle}>Login</h2>
            <form className={css.loginForm} onSubmit={formik.handleSubmit}>
                <input className={css.input}
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder='Email'
                />
           
                {formik.values.email !== '' && formik.errors.email ? <p className={css.inputLoginErrorEmail}>{formik.errors.email}</p> : null}
            
                <input className={css.input}
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder='Password'
                />

                {formik.values.password !== '' && formik.errors.password ? <p className={css.inputLoginErrorPassword}>{formik.errors.password}</p> : null}
            
                <button className={css.formBtn} type="submit" >Login</button>
            </form>
            <p className={css.linkToPage}>Don't have an account? </p>
        </div>
    )
};

export default LoginForm;