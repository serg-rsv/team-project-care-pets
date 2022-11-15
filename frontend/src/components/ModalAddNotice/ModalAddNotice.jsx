import {useState} from 'react';
import { useFormik } from 'formik';
import css from './modalAddNotice.module.scss';
// import style from '../RegisterForm/authForm.module.scss'
// import style from '../RegisterForm/authForm.module.scss'
import * as Yup from 'yup';


const ModalAddNotice = () => {
  
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
//   const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  
//   const validationFirstStep = (fields) => {
//     if (!fields.errors.email && !fields.errors.password && !fields.errors.confirmPassword && fields.values.email!=='' &&fields.values.password!=='' &&fields.values.confirmPassword!=='') {
//       setIsBtnDisabled(false)
//     } else {
//       setIsBtnDisabled(true)
//     }
//   }

//   function to next step registration
  const moveNextRegistration = () => {

    isFirstRegisterStep ?
      setIsFirstRegisterStep(false) :
      setIsFirstRegisterStep(true);
  }

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
   const formik = useFormik({
       initialValues: {
        titleAd: '',
        namePet: '',
        birthPet:'',
        breedPet: '',
        sexPet: '',
        locationPet: '',
        pricePet: '',
        imgPet: '',
        commentsAd:'',
        
      },
       validationSchema: Yup.object().shape({
           titleAd: Yup.string()
                .required('Please enter')
                .min(2, "Title must be at least 2 characters")
                .max(48, "Title must not exceed 48 characters"),
           namePet: Yup.string().trim()
                .min(2, "Title must be at least 2 characters")
               .max(16, "Title must not exceed 16 characters"),
           birthPet: Yup.date(),
           breed: Yup.string()
           .min(2, "Title must be at least 2 characters")
               .max(24, "Title must not exceed 24 characters"),
           location: Yup.string(),
           pricePet: Yup.number()
               .required('Please enter')
               .moreThan(0, 'Price more then 0'),
           comments: Yup.string()
               .required('Please enter')
                .min(8, "Title must be at least 8 characters")
               .max(120, "Title must not exceed 120 characters"),

     }),
     onSubmit: (values) => {
       console.log(formik.touched)
          alert(JSON.stringify(values, null, 2));
          // console.log('submit:', values)
          formik.resetForm()
        },
    });

  
  return (
    <div className={css.noticeFormBlock}>
          <h2 className={css.noticeFormTitle}>Add pet</h2>
          <p className={css.noticeFormText}>Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur </p>
        <form className={css.noticeForm} onSubmit={formik.handleSubmit}>
        
              {isFirstRegisterStep ? <>
                  <label className={css.noticeInputTitle} htmlFor="titleAd">Tittle of ad<span className={css.reqiuredFieldForm}>*</span></label>
        <input className={css.noticeFormInput}
            id="titleAd"
            name="titleAd"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.titleAd}
            placeholder = 'Type name pet'
              />  

        <label className={css.noticeInputTitle} htmlFor="namePet">Name pet</label>      
        <input className={css.noticeFormInput}
            id="namePet"
            name="namePet"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.namePet}
            placeholder = 'Type name pet'
              />

        <label className={css.noticeInputTitle} htmlFor="birthPet">Date of birth</label>     
        <input className={css.noticeFormInput}
            id="birthPet"
            name="birthPet"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.birthPet}
            placeholder = 'Type name pet'
              />

        <label className={css.noticeInputTitle} htmlFor="breedPet">Breed</label>      
        <input className={css.noticeFormInput}
            id="breedPet"
            name="breedPet"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.breedPet}
            placeholder = 'Type name pet'
              />
        </> : <>
            <fieldset className={css.inputWrapper}>
            <legend className={css.noticeInputTitle}>The sex<span className={css.reqiuredFieldForm}>*</span>:</legend>
        
        <input className={css.sexPetInputMale}
            id="malePet"
            name="sexPet"
            type="radio"
            value = "male"
            onChange={formik.handleChange}
              />
        <label htmlFor="malePet" className={css.noticeInputRadioTitle} >Male</label> 
              
              
        <input className={css.sexPetInputFemale}
            id="femalePet"
            name="sexPet"
            type="radio"
            value="female" 
            onChange={formik.handleChange}
              />
          <label htmlFor="femalePet" className={css.noticeInputRadioTitle}> Female</label>
  
        </fieldset>
            
        <label className={css.noticeInputTitle} htmlFor="locationPet">Location<span className={css.reqiuredFieldForm}>*</span>:</label>       
        <input className={css.noticeFormInput}
            id="locationPet"
            name="locationPet"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.locationPet}
            placeholder = 'Location'
            />
            
            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>Load the pat's image</legend>
              <label className={css.imgPetIcon} htmlFor="imgPet">
              <svg width="51" height="51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5 49.166V25.5m0 0V1.833m0 23.667h23.667m-23.667 0H1.834" stroke="#111" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/></svg>

          <input className={css.imgPetInput}
              id="imgPet"
              name="imgPet"
              type="file"
              onChange={formik.handleChange}
              value={formik.values.imgPet}
                />
                </label>
        </fieldset>

        <label className={css.noticeInputTitle} htmlFor="commentsAd">Comments</label>
        <input className={css.noticeFormInput}
            id="commentsAd"
            name="commentsAd"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.commentsAd}
              />
              </>}
        

        
              <button className={css.noticeFormNextBtn} type="button" onClick={moveNextRegistration}>Next</button>
              <button className={css.noticeFormCancelBtn} type="button">Cancel</button>
              {/* <button type="submit">Done</button>
              <button type="button">Back</button> */}
          
          </form>
    </div>
)};

export default ModalAddNotice;
