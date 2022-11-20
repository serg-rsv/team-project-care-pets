import {useState} from 'react';
import { useFormik } from 'formik';
import css from './modalAddNotice.module.scss';
// import style from '../RegisterForm/authForm.module.scss'
// import style from '../RegisterForm/authForm.module.scss'
import * as Yup from 'yup';
import maleIconMob from '../../images/addNotice/male-icon-mob.png';
import femaleIconMob from '../../images/addNotice/female-icon-mob.png';
import maleIcon from '../../images/addNotice/male-icon.png';
import  femaleIcon from '../../images/addNotice/female-icon.png';


const ModalAddNotice = ({ createAds }) => {
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
    isFirstRegisterStep
      ? setIsFirstRegisterStep(false)
      : setIsFirstRegisterStep(true);
  };

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      filter: '',
      titleAd: '',
      namePet: '',
      birthPet: '',
      breedPet: '',
      sexPet: '',
      locationPet: '',
      pricePet: '',
      imgPet: '',
      commentsAd: '',
    },
    validationSchema: Yup.object().shape({
      titleAd: Yup.string()
        .required('Please enter')
        .matches(/^[aA-zZ\s]+$/, 'only letters')
        .min(2, 'Title must be at least 2 characters')
        .max(48, 'Title must not exceed 48 characters'),
      namePet: Yup.string()
        .trim()
        .matches(/^[aA-zZ\s]+$/, 'only letters')
        .min(2, 'Title must be at least 2 characters')
        .max(16, 'Title must not exceed 16 characters'),
      birthPet: Yup.string().matches(
        /^([0-2][0-9]|(3)[0-1]).(((0)[0-9])|((1)[0-2])).\d{4}$/,
        'Invalid date (dd.mm.yyyy)'
      ),
      breedPet: Yup.string()
        .matches(/^[aA-zZ\s]+$/, 'only letters')
        .min(2, 'Title must be at least 2 characters')
        .max(24, 'Title must not exceed 24 characters'),
      locationPet: Yup.string().matches(
        /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/,
        'Type: city, region'
      ),
      pricePet: Yup.string().when('filter', {
        is: filter => filter === 'sell',
        then: Yup.string()
          .required('Please enter')
          .matches(/^[1-9][0-9]*$/, 'Invalid price'),
      }),
      commentsAd: Yup.string()
        .required('Please enter')
        .min(8, 'Title must be at least 8 characters')
        .max(120, 'Title must not exceed 120 characters'),
    }),
    onSubmit: values => {
      
      createAds(values);
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      // console.log('submit:', values)
      formik.resetForm();
    },
  });

  

  return (
    <div className={css.noticeFormBlock}>
      <h2 className={css.noticeFormTitle}>Add pet</h2>
      <p className={css.noticeFormText}>
        Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
        consectetur{' '}
      </p>
      <form className={css.noticeForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <fieldset className={css.inputWrapper}>
              <div className={css.filterWrapper}>
                <input
                  className={css.radioInputFilter}
                  id="LostFound"
                  name="filter"
                  type="radio"
                  value="lost/found"
                  onChange={formik.handleChange}
                />
                <label htmlFor="LostFound" className={css.fiterLostFound}>
                  lost/found
                </label>

                <input
                  className={css.radioInputFilter}
                  id="inGoodHands"
                  name="filter"
                  type="radio"
                  value="In good hands"
                  onChange={formik.handleChange}
                />
                <label htmlFor="inGoodHands" className={css.fiterInGoodHands}>
                  {' '}
                  In good hands
                </label>

                <input
                  className={css.radioInputFilter}
                  id="sell"
                  name="filter"
                  type="radio"
                  value="sell"
                  onChange={formik.handleChange}
                />
                <label className={css.fiterSell} htmlFor="sell">
                  sell
                </label>
              </div>
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="titleAd">
              Tittle of ad<span className={css.reqiuredFieldForm}>*</span>
            </label>
            {formik.values.titleAd !== '' && formik.errors.titleAd ? (
              <p className={css.inputError}>{formik.errors.titleAd}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="titleAd"
              name="titleAd"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.titleAd}
              placeholder="Type name pet"
            />

            <label className={css.noticeInputTitle} htmlFor="namePet">
              Name pet
            </label>
            {formik.values.namePet !== '' && formik.errors.namePet ? (
              <p className={css.inputError}>{formik.errors.namePet}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="namePet"
              name="namePet"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.namePet}
              placeholder="Type name pet"
            />

            <label className={css.noticeInputTitle} htmlFor="birthPet">
              Date of birth
            </label>
            {formik.values.birthPet !== '' && formik.errors.birthPet ? (
              <p className={css.inputError}>{formik.errors.birthPet}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="birthPet"
              name="birthPet"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.birthPet}
              placeholder="Type name pet"
            />

            <label className={css.noticeInputTitle} htmlFor="breedPet">
              Breed
            </label>
            {formik.values.breedPet && formik.errors.breedPet ? (
              <p className={css.inputError}>{formik.errors.breedPet}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="breedPet"
              name="breedPet"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.breedPet}
              placeholder="Type name pet"
            />
          </>
        ) : (
          <>
            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeSexPetTitle}>
                The sex<span className={css.reqiuredFieldForm}>*</span>:
              </legend>
              <div className={css.sexPetCheckWrapper}>
                <div className={css.sexPetWrapperMale}>
                  <img
                    className={css.sexPetIconMale}
                    srcSet={`${maleIconMob} 36w, ${maleIcon} 54w`}
                    sizes="(min-width:768px) 54px, 36px"
                    src={maleIconMob}
                    alt="The sex: male"
                  />

                  <input
                    className={css.radioInputSex}
                    id="malePet"
                    name="sexPet"
                    type="radio"
                    value="male"
                    onChange={formik.handleChange}
                  />

                  <label
                    htmlFor="malePet"
                    className={css.noticeInputRadioTitle}
                  >
                    Male
                  </label>
                </div>

                <div className={css.sexPetWrapperFemale}>
                  <img
                    className={css.sexPetIconFemale}
                    srcSet={`${femaleIconMob} 25w, ${femaleIcon} 38w`}
                    sizes="(min-width:768px) 38px, 25px"
                    src={femaleIconMob}
                    alt="The sex:female"
                  />

                  <input
                    className={css.radioInputSex}
                    id="femalePet"
                    name="sexPet"
                    type="radio"
                    value="female"
                    onChange={formik.handleChange}
                  />

                  <label
                    htmlFor="femalePet"
                    className={css.noticeInputRadioTitle}
                  >
                    {' '}
                    Female
                  </label>
                </div>
              </div>
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="locationPet">
              Location<span className={css.reqiuredFieldForm}>*</span>:
            </label>
            {formik.values.locationPet !== '' && formik.errors.locationPet ? (
              <p className={css.inputError}>{formik.errors.locationPet}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="locationPet"
              name="locationPet"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.locationPet}
              placeholder="Location"
            />

            {formik.values.filter === 'sell' ? (
              <>
                <label htmlFor="pricePet" className={css.noticeInputTitle}>
                  Price<span className={css.reqiuredFieldForm}>*</span>:
                </label>
                {formik.values.pricePet !== '' && formik.errors.pricePet ? (
                  <p className={css.inputError}>{formik.errors.pricePet}</p>
                ) : null}
                <input
                  className={css.noticeFormInput}
                  id="pricePet"
                  name="pricePet"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.pricePet}
                  placeholder="Type price"
                />
              </>
            ) : null}

            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>
                Load the pat's image
              </legend>
              <label className={css.imgPetIcon} htmlFor="imgPet">
                <svg
                  width="51"
                  height="51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.5 49.166V25.5m0 0V1.833m0 23.667h23.667m-23.667 0H1.834"
                    stroke="#111"
                    strokeOpacity=".6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  className={css.imgPetInput}
                  id="imgPet"
                  name="imgPet"
                  type="file"
                  onChange={formik.handleChange}
                  value={formik.values.imgPet}
                />
              </label>
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="commentsAd">
              Comments
            </label>
            {formik.values.commentsAd !== '' && formik.errors.commentsAd ? (
              <p className={css.inputError}>{formik.errors.commentsAd}</p>
            ) : null}
            <textarea
              className={css.noticeFormInput}
              id="commentsAd"
              name="commentsAd"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.commentsAd}
            />
          </>
        )}

        {isFirstRegisterStep && (
          <>
            <button
              type="button"
              className={css.noticeFormNextBtn}
              onClick={moveNextRegistration}
            >
              Next
            </button>
            <button
              className={css.noticeFormCancelBtn}
              onClick={formik.resetForm}
              type="button"
            >
              Cancel
            </button>
          </>
        )}

        {!isFirstRegisterStep && (
          <>
            <button type="submit">Done</button>
            <button onClick={moveNextRegistration} type="button">
              Back
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ModalAddNotice;
