//  import {useState} from 'react';
// import { useFormik } from 'formik';
// import css from './login.module.css'
// // import * as Yup from 'yup';


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

// export const AuthForm= () => {
  
//   const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(false);
  

//   //function to next step registration
//   const moveNextRegistration = () => {
    
//     console.log(formik.errors)
//     isFirstRegisterStep ?
//       setIsFirstRegisterStep(false) :
//       setIsFirstRegisterStep(true);
//   }

//   // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//    const formik = useFormik({
//       initialValues: {
//         email: '',
//         password: '',
//         confirmPassword:'',
//         name: '',
//         location: '',
//         phone: '',
        
//       },
//     //  validationSchema: Yup.object().shape({
//     //    email: Yup.string()
//     //      .email('Email address is invalid')
//     //      .required('Please enter'),
//     //    password: Yup.string()
//     //      .required('Please enter')
//     //      .min(6, "Password must be at least 6 characters")
//     //     .max(40, "Password must not exceed 40 characters"),
//     //    confirmPassword: Yup.string()
//     //      .required('Please enter')
//     //      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
//     //    name: Yup.string()
//     //     //  .name('Name is invalid')
//     //      .required('Please enter'),
//     //    location: Yup.string()
//     //     //  .location('Location is invalid')
//     //      .required('Please enter'),
//     //    phone: Yup.string().required('Please enter'),
//     //     //  .matches(phoneRegExp, 'Phone number is not valid'),
//     //  }),
//        validate,
//       onSubmit: (values,) => {
//           console.log(formik.errors)
//           alert(JSON.stringify(values, null, 2));
//           console.log('submit:', values)
//           formik.resetForm()
//         },
//     });

  
//   return (
//     <div className={css.formBlock}>
//       <h2 className={css.formTitle}>Registration</h2>
//       <form className={css.form} onSubmit={formik.handleSubmit}>
//         {!isFirstRegisterStep ?
//           <>
//             <input className={css.input}
//               id="email"
//               name="email"
//               type="email"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.email}
//               placeholder = 'Email'
//             />
//             {/* {formik.touched.email && formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//             {formik.errors.email?<p className={css.inputErrorEmail}>{formik.errors.email}</p> : null} 
            
//             <input className={css.input}
//               id="password"
//               name="password"
//               type="password"
//               onChange={formik.handleChange}
//               value={formik.values.password}
//               placeholder = 'Password'
//             />
//             {/* {formik.touched.password && formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//             { formik.errors.password?<p className={css.inputErrorPassword}>{formik.errors.password}</p> : null} 
            
//             <input className={css.input}
//               id="confirmPassword"
//               name="confirmPassword"
//               type="confirmPassword"
//               onChange={formik.handleChange}
//               // onBlur={formik.handleBlur}
//               value={formik.values.confirmPassword}
//               placeholder = 'Confirm Password'
//             />
//             {/* {formik.touched.confirmPassword && formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//             {formik.touched.confirmPassword && formik.errors.confirmPassword?<p className={css.inputErrorConfirmPassword}>{formik.errors.confirmPassword}</p> : null} 
//             {/* {formik.touched.confirmPassword && formik.errors.wrongPassword  ?<p className={css.inputWrong}>{formik.errors.wrongPassword}</p> : null} */}
//           </> :
//           <>
//             <input className={css.input}
//               id="name"
//               name="name"
//               type="name"
//               onChange={formik.handleChange}
//               value={formik.values.name}
//               placeholder = 'Name'
//             />
//             {/* {formik.touched.namae && formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//             {formik.touched.name && formik.errors.name?<p className={css.inputErrorName}>{formik.errors.name}</p> : null} 
 
//             <input className={css.input}
//               id="location"
//               name="location"
//               type="location"
//               onChange={formik.handleChange}
//               value={formik.values.location}
//               placeholder="City, region"
//             />
//             {/* {formik.touched.location && formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//             {formik.touched.location && formik.errors.location?<p className={css.inputErrorLocation}>{formik.errors.location}</p> : null} 
 
//             <input className={css.input}
//               id="phone"
//               name="phone"
//               type="phone"
//               onChange={formik.handleChange}
//               value={formik.values.phone}
//               placeholder="Mobile phone"
//             />
//             {/* {formik.touched.phone && formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//             {formik.touched.phone && formik.errors.phone?<p className={css.inputErrorPhone}>{formik.errors.phone}</p> : null} 
//             {/* {formik.errors.emptyFild ?<p className={css.inputNotification}>{formik.errors.emptyFild}</p> : null} */}
//           </>}
        
//           {isFirstRegisterStep &&<button className={css.formBtn} type="submit" >Register</button>}
//         </form>
      
//         {!isFirstRegisterStep && <button className={css.formBtn} type='button' onClick={moveNextRegistration}>Next</button>}
      
//         <p className={css.replaceForm}>Already have an account? Login</p>
//         <button className={css.formBtn} onClick={moveNextRegistration}>Back</button>
      
//     </div>
// )};

