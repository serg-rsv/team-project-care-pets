import {useState} from 'react';
import { useFormik } from 'formik';
import css from './modalAddNotice.module.scss';
// import style from '../RegisterForm/authForm.module.scss'
// import style from '../RegisterForm/authForm.module.scss'
import * as Yup from 'yup';
import maleIcon from '../../images/male-icon.png';
import  femaleIcon from '../../images/female-icon.png';


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
         filter:'',
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
           .matches(/^[aA-zZ\s]+$/, 'only letters')
                .min(2, "Title must be at least 2 characters")
                .max(48, "Title must not exceed 48 characters"),
         namePet: Yup.string().trim()
             .matches(/^[aA-zZ\s]+$/, 'only letters')
                .min(2, "Title must be at least 2 characters")
               .max(16, "Title must not exceed 16 characters"),
          birthPet: Yup.string().matches(/^([0-2][0-9]|(3)[0-1]).(((0)[0-9])|((1)[0-2])).\d{4}$/, 'Invalid date (ddmmyyyy)'),
         breedPet: Yup.string()
             .matches(/^[aA-zZ\s]+$/, 'only letters')
           .min(2, "Title must be at least 2 characters")
               .max(24, "Title must not exceed 24 characters"),
         locationPet: Yup.string()
             .matches(/^[aA-zZ\s]+$/, 'Type Brovary, Kyiv')
         ,
           pricePet: Yup.number('Please enter number')
              //  .required('Please enter')
               .moreThan(0, 'Price more then 0'),
           commentsAd: Yup.string()
               .required('Please enter')
                .min(8, "Title must be at least 8 characters")
               .max(120, "Title must not exceed 120 characters"),
     }),
     onSubmit: (values) => {
       console.log(values)
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
        <fieldset className={css.inputWrapper}>
          <div className={css.filterWrapper}>
              <input className={css.radioInputFilter}
                id="LostFound"
                name="filter"
                type="radio"
                value = "lost/found"
                onChange={formik.handleChange}
                />
              <label htmlFor="LostFound" className={css.fiterLostFound} >lost/found</label> 
             
              <input className={css.radioInputFilter}
                id="inGoodHands"
                name="filter"
                type="radio"
                value="In good hands" 
                onChange={formik.handleChange}
                />
              <label htmlFor="inGoodHands" className={css.fiterInGoodHands}> In good hands</label>

              <input className={css.radioInputFilter}
                id="sell"
                name="filter"
                type="radio"
                value="sell" 
                onChange={formik.handleChange}
              />
              <label className={css.fiterSell} htmlFor="sell">sell</label>

              </div>
          </fieldset>
          
          <label className={css.noticeInputTitle} htmlFor="titleAd">Tittle of ad<span className={css.reqiuredFieldForm}>*</span></label>
              <input className={css.noticeFormInput}
                id="titleAd"
                name="titleAd"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.titleAd}
                placeholder = 'Type name pet'
              />  
          {formik.values.titleAd !== '' && formik.errors.titleAd ? <p className={css.inputErrorTitleAd}>{formik.errors.titleAd}</p> : null}
          
          <label className={css.noticeInputTitle} htmlFor="namePet">Name pet</label>      
              <input className={css.noticeFormInput}
                id="namePet"
                name="namePet"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.namePet}
                placeholder = 'Type name pet'
          />
          {formik.values.namePet!=='' && formik.errors.namePet ? <p className={css.inputErrorNamePet}>{formik.errors.namePet}</p> : null}

        <label className={css.noticeInputTitle} htmlFor="birthPet">Date of birth</label>     
        <input className={css.noticeFormInput}
            id="birthPet"
            name="birthPet"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.birthPet}
            placeholder = 'Type name pet'
          />
        {formik.values.birthPet!=='' && formik.errors.birthPet ? <p className={css.inputErrorBirthPet}>{formik.errors.birthPet}</p> : null}

        <label className={css.noticeInputTitle} htmlFor="breedPet">Breed</label>      
        <input className={css.noticeFormInput}
            id="breedPet"
            name="breedPet"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.breedPet}
            placeholder = 'Type name pet'
          />
        {formik.values.breedPet && formik.errors.breedPet ? <p className={css.inputErrorBreedPet}>{formik.errors.breedPet}</p> : null}
        </>
          :
        <>
          <fieldset className={css.inputWrapper}>
            <legend className={css.noticeSexPetTitle}>The sex<span className={css.reqiuredFieldForm}>*</span>:</legend>
              <div className={css.sexPetCheckWrapper}>
                <div className={css.sexPetWrapperMale}>
                  <img className={css.sexPetIconMale} src={maleIcon} alt="The sex: male" />

                  <input className={css.radioInputSex}
                    id="malePet"
                    name="sexPet"
                    type="radio"
                    value = "male"
                    onChange={formik.handleChange}
                  />
                  
                  <label htmlFor="malePet" className={css.noticeInputRadioTitle} >Male</label> 
                </div>

                <div className={css.sexPetWrapperFemale}>
                  <img className={css.sexPetIconFemale} src={femaleIcon} alt="The sex:female" />
                  
                  <input className={css.radioInputSex}
                    id="femalePet"
                    name="sexPet"
                    type="radio"
                    value="female" 
                    onChange={formik.handleChange}
                  />
                  
                  <label htmlFor="femalePet" className={css.noticeInputRadioTitle}> Female</label>
                </div>
              </div>
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
            {formik.values.locationPet!=='' && formik.errors.locationPet ? <p className={css.inputErrorLocationPet}>{formik.errors.locationPet}</p> : null}
            

            {formik.values.filter === 'sell' ?
            <label className={css.noticeInputTitle} >Price<span className={css.reqiuredFieldForm}>*</span>:       
            <input className={css.noticeFormInput}
              id="pricePet"
              name="pricePet"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.pricePet}
              placeholder = 'Type price'
              />
            </label>
              : null}
            {formik.touched.pricePet && formik.errors.pricePet ? <p className={css.inputErrorPricePet}>{formik.errors.pricePet}</p> : null}

            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>Load the pat's image</legend>
              <label className={css.imgPetIcon} htmlFor="imgPet">
                <svg width="51" height="51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5 49.166V25.5m0 0V1.833m0 23.667h23.667m-23.667 0H1.834" stroke="#111" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round"/></svg>

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
            {formik.touched.commentsAd && formik.errors.commentsAd ? <p  className={css.inputErrorCommentsAd}>{formik.errors.commentsAd}</p> : null}
          </>}
        
            {isFirstRegisterStep &&
              <>
                <button type='button' className={css.noticeFormNextBtn} onClick={moveNextRegistration}>Next</button>
                <button className={css.noticeFormCancelBtn} type="button">Cancel</button>
              </>
            }
        
            {!isFirstRegisterStep &&
              <>
                <button type="submit" >Done</button>
                <button onClick={moveNextRegistration} type="button">Back</button>
              </>
            }
        </form>
    </div>
)};

export default ModalAddNotice;
