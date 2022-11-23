import { useState } from 'react';
import { useFormik } from 'formik';
import css from './modalAddNotice.module.scss';
import * as Yup from 'yup';
import Button from '../Button/Button';
import maleIconMob from '../../images/addNotice/male-icon-mob.png';
import femaleIconMob from '../../images/addNotice/female-icon-mob.png';
import maleIcon from '../../images/addNotice/male-icon.png';
import femaleIcon from '../../images/addNotice/female-icon.png';
import { useCreateNoticeMutation } from '../../redux/services/noticesSlice';
import { formDataAppender } from '../../helpers/formDataAppender';

const ModalAddNotice = ({ closeButton }) => {
  const [createNotice, { isLoading }] = useCreateNoticeMutation();
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const moveNextRegistration = () => {
    isFirstRegisterStep
      ? setIsFirstRegisterStep(false)
      : setIsFirstRegisterStep(true);
  };

  const onImageChange = e => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue('image', e.currentTarget.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      category: '',
      title: '',
      name: '',
      birthday: '',
      breed: '',
      sex: '',
      location: '',
      price: 0,
      image: '',
      comments: '',
    },
    validationSchema: Yup.object().shape({
      category: Yup.string().required('Please choose one'),
      title: Yup.string()
        .required('Please enter title of your notice')
        .matches(/^[aA-zZ\s]+$/, 'Title contain only letters')
        .min(2, 'Title must be at least 2 characters')
        .max(48, 'Title must not exceed 48 characters'),
      name: Yup.string()
        .trim()
        .required('Please enter name of your pet')
        .matches(/^[aA-zZ\s]+$/, 'Name contain only letters')
        .min(2, 'Name must be at least 2 characters')
        .max(16, 'Name must not exceed 16 characters'),
      birthday: Yup.date().required('Please enter date of pet birth'),
      breed: Yup.string()
        .required('Please enter breed of your pet')
        .matches(/^[aA-zZ\s]+$/, 'only letters')
        .min(2, 'Breed must be at least 2 characters')
        .max(24, 'Breed must not exceed 24 characters'),
      location: Yup.string()
        .matches(
          /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/,
          'Enter by type: City, Region'
        )
        .required('Please enter location of your location'),
      sex: Yup.string().required('Please choose one'),
      price: Yup.string().when('category', {
        is: category => category === 'sell',
        then: Yup.string()
          .required('Please enter')
          .matches(/^[1-9][0-9]*$/, 'Invalid price'),
      }),
      comments: Yup.string()
        .required('Please enter')
        .min(8, 'Comment must be at least 8 characters')
        .max(120, 'Comment must not exceed 120 characters'),
    }),
    onSubmit: async () => {
      await createNotice(formDataAppender(formik.values));
      formik.resetForm();
      closeButton();
    },
  });

  return (
    <div className={css.noticeFormBlock}>
      <h2 className={css.noticeFormTitle}>Add pet notice</h2>
      <p className={css.noticeFormText}>
        Please add your pet notice to our database. It will help many people to
        find a friend
      </p>
      <form className={css.noticeForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <fieldset className={css.inputWrapper}>
              <div className={css.filterWrapper}>
                <input
                  className={css.radioInputFilter}
                  id="LostFound"
                  name="category"
                  type="radio"
                  value="lost-found"
                  onChange={formik.handleChange}
                />
                <label htmlFor="LostFound" className={css.filterLostFound}>
                  lost/found
                </label>

                <input
                  className={css.radioInputFilter}
                  id="inGoodHands"
                  name="category"
                  type="radio"
                  value="for-free"
                  onChange={formik.handleChange}
                />
                <label htmlFor="inGoodHands" className={css.filterInGoodHands}>
                  In good hands
                </label>

                <input
                  className={css.radioInputFilter}
                  id="sell"
                  name="category"
                  type="radio"
                  value="sell"
                  onChange={formik.handleChange}
                />
                <label className={css.filterSell} htmlFor="sell">
                  sell
                </label>
              </div>
            </fieldset>
            {formik.touched.category && formik.errors.category ? (
              <p className={css.inputError}>{formik.errors.category}</p>
            ) : null}

            <label className={css.noticeInputTitle} htmlFor="titleAd">
              Tittle of ad<span className={css.reqiuredFieldForm}>*</span>
            </label>
            {formik.values.title !== '' && formik.errors.title ? (
              <p className={css.inputError}>{formik.errors.title}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="titleAd"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Type name pet"
            />

            <label className={css.noticeInputTitle} htmlFor="namePet">
              Name pet
            </label>
            {formik.values.name !== '' && formik.errors.name ? (
              <p className={css.inputError}>{formik.errors.name}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="namePet"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Type name pet"
            />

            <label className={css.noticeInputTitle} htmlFor="birthdayPet">
              Date of birthday
            </label>
            {formik.values.birthday !== '' && formik.errors.birthday ? (
              <p className={css.inputError}>{formik.errors.birthday}</p>
            ) : null}
            <input
              className={css.noticeFormInputDate}
              id="birthdayPet"
              name="birthday"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.birthday}
            />

            <label className={css.noticeInputTitle} htmlFor="breedPet">
              Breed
            </label>
            {formik.values.breed && formik.errors.breed ? (
              <p className={css.inputError}>{formik.errors.breed}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="breedPet"
              name="breed"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.breed}
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
                    name="sex"
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
                    name="sex"
                    type="radio"
                    value="female"
                    onChange={formik.handleChange}
                  />

                  <label
                    htmlFor="femalePet"
                    className={css.noticeInputRadioTitle}
                  >
                    Female
                  </label>
                </div>
              </div>
            </fieldset>
            {formik.touched.sex && formik.errors.sex ? (
              <p className={css.inputError}>{formik.errors.sex}</p>
            ) : null}

            <label className={css.noticeInputTitle} htmlFor="locationPet">
              Location<span className={css.reqiuredFieldForm}>*</span>:
            </label>
            {formik.values.location !== '' && formik.errors.location ? (
              <p className={css.inputError}>{formik.errors.location}</p>
            ) : null}
            <input
              className={css.noticeFormInput}
              id="locationPet"
              name="location"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.location}
              placeholder="Location"
            />

            {formik.values.category === 'sell' ? (
              <>
                <label htmlFor="pricePet" className={css.noticeInputTitle}>
                  Price<span className={css.reqiuredFieldForm}>*</span>:
                </label>
                {formik.values.price !== '' && formik.errors.price ? (
                  <p className={css.inputError}>{formik.errors.price}</p>
                ) : null}
                <input
                  className={css.noticeFormInput}
                  id="pricePet"
                  name="price"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  placeholder="Type price"
                />
              </>
            ) : null}

            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>
                Load the pat's image
              </legend>
              {formik.values.image === '' ? (
                <label className={css.imgPetIcon} htmlFor="image">
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
                  {/* {formik.values.image ==='' ?<svg width="51" height="51" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5 49.166V25.5m0 0V1.833m0 23.667h23.667m-23.667 0H1.834" stroke="#111" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round"/></svg>: <img className={css.addedImg} alt='pet' src={image} />} */}
                  <input
                    className={css.imgPetInput}
                    id="image"
                    name="image"
                    type="file"
                    onChange={e => {
                      formik.handleChange(e);
                      onImageChange(e);
                    }}
                  />
                </label>
              ) : (
                <div className={css.addedImg}>
                  <img alt="pet" src={imagePreview} />
                </div>
              )}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="commentsAd">
              Comments
            </label>
            {formik.values.comments !== '' && formik.errors.comments ? (
              <p className={css.inputError}>{formik.errors.comments}</p>
            ) : null}
            <textarea
              className={css.noticeFormInput}
              id="commentsAd"
              name="comments"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.comments}
            />
          </>
        )}

        {isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children="Cancel"
              onClick={closeButton}
              className={css.btnAccent}
            />
            <Button
              children="Next"
              onClick={moveNextRegistration}
              className={css.btnSec}
            />
          </div>
        )}

        {!isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children="Back"
              className={css.btnAccent}
              onClick={moveNextRegistration}
            />
            <Button
              children="Done"
              buttonType="submit"
              className={css.btnSec}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ModalAddNotice;
