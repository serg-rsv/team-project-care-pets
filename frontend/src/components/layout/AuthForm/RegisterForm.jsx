 import {useState} from 'react';
import { useFormik } from 'formik';
import css from './authForm.module.scss'
import * as Yup from 'yup';


// const validate = values => {
//   const errors = {};

//   if (!values.email) {
//     errors.email = 'Required'
//   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//      errors.email = 'Invalid email address';
//    }
//    if (!values.password) {
//     errors.password = 'Required'
//    } else if (values.password.length > 12) {
//      errors.password = 'dfgdgf'
//   }
//    if (!values.confirmPassword) {
//     errors.confirmPassword = 'Required'
//    } else if (values.confirmPassword !== values.password) {
//      errors.confirmPassword = 'kjhkjhkj'
//   }
//    if (!values.name) {
//     errors.name = 'Required'
//    } else if (values.name=== ';;') {
//        errors.name = 'Invalid'
//   }
//    if (!values.location) {
//     errors.location = 'Required'
//   }else if(values.location==='ll'){
//        errors.location = 'Invalid'
//   }
//    if (!values.phone) {
//     errors.phone = 'Required'
//    } else if (values.phone === 'sdss') {
//        errors.phone ='dfdf'
//   }
//   return errors

// }

const RegisterForm= () => {
  
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  
  const validationFirstStep = (fields) => {
    if (!fields.errors.email && !fields.errors.password && !fields.errors.confirmPassword && fields.values.email!=='' &&fields.values.password!=='' &&fields.values.confirmPassword!=='') {
      setIsBtnDisabled(false)
    } else {
      setIsBtnDisabled(true)
    }
  }

  //function to next step registration
  const moveNextRegistration = () => {
    // !fields.errors.email && !fields.errors.password && !fields.errors.confirmPassword && fields.values.email !== '' && fields.values.password !== '' && fields.values.confirmPassword !== '' ?
    //   setIsFirstRegisterStep(true) :
    //   setIsFirstRegisterStep(false)
    isFirstRegisterStep ?
      setIsFirstRegisterStep(false) :
      setIsFirstRegisterStep(true);
  }

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        confirmPassword:'',
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
         .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
       confirmPassword: Yup.string()
         .required('Please enter')
         .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
       name: Yup.string()
         .required('Please enter'),
       location: Yup.string()
         .required('Please enter'),
       phone: Yup.string().required('Please enter'),
        //  .matches(phoneRegExp, 'Phone number is not valid'),
     }),
     onSubmit: (values) => {
       console.log(formik.touched)
          alert(JSON.stringify(values, null, 2));
          // console.log('submit:', values)
          formik.resetForm()
        },
    });

  
  return (
    <div className={css.formBlock}>
      <h2 className={css.formTitle}>Registration</h2>
      <form className={css.registerForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ?
          <>
            <input className={css.input}
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={() => {
                validationFirstStep(formik)
              }}
              value={formik.values.email}
              placeholder = 'Email'
            />
           
            { formik.values.email!=='' && formik.errors.email?<p className={css.inputErrorEmail}>{formik.errors.email}</p> : null } 
            
            <input className={css.input}
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={() => {
                validationFirstStep(formik)
              }
              }
              value={formik.values.password}
              placeholder = 'Password'
            />
            { formik.values.password!==''&& formik.errors.password ?<p className={css.inputErrorPassword}>{formik.errors.password}</p> : null} 
            
            <input className={css.input}
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              onChange={formik.handleChange}
              onBlur={() => {
                console.log('next')
                 validationFirstStep(formik)
              }
              }
              value={formik.values.confirmPassword}
              placeholder = 'Confirm Password'
            />
            {formik.values.confirmPassword !== '' && formik.errors.confirmPassword ? <p className={css.inputErrorConfirmPassword}>{formik.errors.confirmPassword}</p> : null}
          </> :
          <>
            <input className={css.input}
              id="name"
              name="name"
              type="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder = 'Name'
            />
            {formik.touched.name && formik.errors.name?<p className={css.inputErrorName}>{formik.errors.name}</p> : null} 
 
            <input className={css.input}
              id="location"
              name="location"
              type="location"
              onChange={formik.handleChange}
              value={formik.values.location}
              placeholder="City, region"
            />
            {formik.touched.location && formik.errors.location?<p className={css.inputErrorLocation}>{formik.errors.location}</p> : null} 
 
            <input className={css.input}
              id="phone"
              name="phone"
              type="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              placeholder="Mobile phone"
            />
            {formik.touched.phone && formik.errors.phone?<p className={css.inputErrorPhone}>{formik.errors.phone}</p> : null} 
          </>}
        
        {isFirstRegisterStep && <button className={css.formBtn} disabled={ isBtnDisabled} type='button' onClick={moveNextRegistration}>Next</button>}
        {!isFirstRegisterStep && <button className={css.formBtn} type="submit" >Register</button>}
        </form>
      
        {/* {!isFirstRegisterStep && <button className={css.formBtn} type='button' onClick={moveNextRegistration}>Next</button>} */}
      
        <p className={css.linkToPage}>Already have an account? Login</p>
        {/* <button className={css.formBtn} onClick={moveNextRegistration}>Back</button> */}
      
    </div>
)};

export default RegisterForm;