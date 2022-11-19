import {useState} from 'react';
import { useFormik } from 'formik';
import Button from '../button/button';
import css from './modalAddPet.module.scss';

import * as Yup from 'yup';

const ModalAddPet = () => {
  
    const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
    const [image, setImage] = useState(null); 
  
  const moveNextRegistration = () => {
    isFirstRegisterStep ? setIsFirstRegisterStep(false) : setIsFirstRegisterStep(true);
  }

  const onimageChange = (e) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }
    
    const formik = useFormik({
       initialValues:{
        name: '',
        birth:'',
        breed: '',
        image: '',
        comments:'',
      },
       validationSchema: Yup.object().shape({
        name: Yup.string().trim()
            .required('Please enter')
            .matches(/^[aA-zZ\s]+$/, 'Name contain only letters')
            .min(2, "Title must be at least 2 characters")
            .max(16, "Title must not exceed 16 characters"),
        birth: Yup.string()
            .required('Please enter')
            .matches(/^([0-2][0-9]|(3)[0-1]).(((0)[0-9])|((1)[0-2])).\d{4}$/, 'Invalid date (dd.mm.yyyy)'),
        breed: Yup.string()
            .required('Please enter')
            .matches(/^[aA-zZ\s]+$/, 'Breed contain only letters')
            .min(2, "Title must be at least 2 characters")
            .max(16, "Title must not exceed 16 characters"),
        comments: Yup.string()
            .required('Please enter')
            .min(8, "Title must be at least 8 characters")
            .max(120, "Title must not exceed 120 characters"),
     }),
     onSubmit: (values) => {
        console.log(values)
        alert(JSON.stringify(values, null, 2));
        formik.resetForm()
        },
    });

  
  return (
    <div className={css.formBlock}>
      <h2 className={css.formTitle}>Add pet</h2>
      <form className={css.addPetForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? <>
          <label className={css.addPetInputTitle} htmlFor="name">Name pet</label>      
          {formik.values.name!=='' && formik.errors.name ? <p className={css.inputError}>{formik.errors.name}</p> : null}
          <input className={css.addPetFormInput}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder = 'Type name pet'
          />

        <label className={css.addPetInputTitle} htmlFor="birth">Date of birth</label>  
        {formik.values.birth!=='' && formik.errors.birth ? <p className={css.inputError}>{formik.errors.birth}</p> : null}  
        <input className={css.addPetFormInput}
            id="birth"
            name="birth"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.birth}
            placeholder = 'Type date of birth pet'
          />

        <label className={css.addPetInputTitle} htmlFor="breed">Breed</label>      
        {formik.values.breed && formik.errors.breed ? <p className={css.inputError}>{formik.errors.breed}</p> : null}
        <input className={css.addPetFormInput}
            id="breed"
            name="breed"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.breed}
            placeholder = 'Type breed pet'
          />
        
        </>
          :
        <>
        <fieldset className={css.inputWrapper}>
            <legend className={css.addPhotoPetTitle}>Load photo and some comments</legend>
              {formik.values.image === '' ?
                <label className={css.photoAddIcon} htmlFor="imagePet">
                  <svg width="51" height="51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5 49.166V25.5m0 0V1.833m0 23.667h23.667m-23.667 0H1.834" stroke="#111" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" /></svg>
                  <input className={css.photoPetInput}
                    id="imagePet"
                    name="image"
                    type="file"
                    onChange={(e) => {
                      formik.handleChange(e);
                      onimageChange(e);
                    }}
                  />
                </label> :
                <div className={css.addedImg}><img alt='pet' src={image} /></div>
              }
                
        </fieldset>
        <div className={css.textareaBlock}> 
          <label className={css.addPetCommentsTitle} htmlFor="comments">Comments</label>
          {formik.values.comments !=='' && formik.errors.comments ? <p  className={css.inputError}>{formik.errors.comments}</p> : null}
          <textarea  className={css.addPetFormComments}
              id="comments"
              name="comments"
              type="text"
              onChange={formik.handleChange}
                value={formik.values.comments}
              />
        </div>  
        </>}
        
            {isFirstRegisterStep &&
          <div className={css.btnBlock}>
          <Button children='Next' onClick={moveNextRegistration} className={css.btnAccent} />
          < Button children='Cancel' onClick={formik.resetForm} className={css.btnSec} />  
              </div>
            }
        
            {!isFirstRegisterStep &&
              <div className={css.btnBlock}>
                <Button children='Done' className={css.btnAccent} buttonType='submit' />
                <Button children='Back' onClick={moveNextRegistration} className={css.btnSec}/>
              </div>
            }
        </form>
    </div>
)};

export default ModalAddPet;
