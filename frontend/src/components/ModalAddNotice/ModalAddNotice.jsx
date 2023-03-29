import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCreateNoticeMutation } from '../../redux/services/noticesSlice';
import { setNotices } from '../../redux/noticesSlice';
import { formDataAppender } from '../../helpers/formDataAppender';
import Location from '../Location';
import Button from '../Button/Button';
import css from './modalAddNotice.module.scss';

const ModalAddNotice = ({ closeButton }) => {
  const { t } = useTranslation('common');
  const [createNotice, { isLoading }] = useCreateNoticeMutation();
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const categorySetByDefault = () => {
    const enterPoint = pathname.split('/').pop();
    return enterPoint === 'notices' ? 'sell' : enterPoint;
  };

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

  const setLocationInfo = locationData => {
    formik.setFieldValue('location', locationData);
  };

  const formik = useFormik({
    initialValues: {
      category: categorySetByDefault(),
      title: '',
      name: '',
      birthday: `${new Date().toISOString().split('T')[0]}`,
      breed: '',
      sex: 'male',
      location: '',
      price: 1,
      image: '',
      comments: '',
    },
    validationSchema: Yup.object().shape({
      category: Yup.string().required(t('ModalAddNotice.selectCategory')),
      title: Yup.string()
        .required(t('ModalAddNotice.enterTitle'))
        .min(2, t('ModalAddNotice.min2Chars'))
        .matches(
          /^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/,
          t('ModalAddNotice.titleLettersSpacesOnly')
        )
        .trim()
        .max(48, t('ModalAddNotice.max48Chars')),
      name: Yup.string()
        .trim()
        .min(2, t('ModalAddNotice.min2Chars'))
        .required(t('ModalAddNotice.enterPetName'))
        .matches(
          /^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/,
          t('ModalAddNotice.petNameLettersSpacesOnly')
        )
        .max(16, t('ModalAddNotice.max16Chars')),
      birthday: Yup.date()
        .required(t('ModalAddNotice.selectBirthdate'))
        .max(new Date(), t('ModalAddNotice.birthdateInPast')),
      breed: Yup.string()
        .required(t('ModalAddNotice.enterBreed'))
        .min(2, t('ModalAddNotice.min2Chars'))
        .matches(/^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/, 'only letters')
        .trim()
        .max(24, t('ModalAddNotice.max24Chars')),
      location: Yup.string().required(t('ModalAddNotice.enterLocation')),
      sex: Yup.string().required(t('ModalAddNotice.selectGender')),
      price: Yup.string().when('category', {
        is: category => category === 'sell',
        then: Yup.string()
          .required(t('ModalAddNotice.enterPrice'))
          .matches(/^[0-9][0-9]*$/, t('ModalAddNotice.onlyNumbers')),
      }),
      comments: Yup.string()
        .trim()
        .required(t('ModalAddNotice.enterDescription'))
        .min(8, t('ModalAddNotice.min8Chars'))
        .max(120, t('ModalAddNotice.max120Chars')),
    }),
    onSubmit: async () => {
      dispatch(setNotices([]));
      await createNotice(formDataAppender(formik.values))
        .unwrap()
        .then(() => {
          toast.success(t('ModalAddNotice.createSuccess'));
        })
        .catch(() => {
          toast.error(t('ModalAddNotice.createFailed'));
        });
      formik.resetForm();
      closeButton();
    },
  });

  useEffect(() => {
    const firstStepPossibleErrors = [
      'category',
      'title',
      'name',
      'birthday',
      'breed',
    ];
    const isValidFieldsInFirstStep = !Object.keys(formik.errors).some(error =>
      firstStepPossibleErrors.includes(error)
    );
    isValidFieldsInFirstStep && formik.values.title.length > 0
      ? setDisableNextButton(false)
      : setDisableNextButton(true);
  }, [formik, disableNextButton]);

  return (
    <div className={css.noticeFormBlock}>
      <h2 className={css.noticeFormTitle}>{t('ModalAddNotice.newNotice')}</h2>
      <form className={css.noticeForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <p className={css.noticeFormText}>
              {t('ModalAddNotice.addBasicInfo')}
            </p>
            <fieldset className={css.inputWrapper}>
              <div className={css.filterWrapper}>
                <input
                  className={css.radioInputFilter}
                  id="LostFound"
                  name="category"
                  type="radio"
                  value="lost-found"
                  onChange={formik.handleChange}
                  checked={formik.values.category === 'lost-found'}
                />
                <label htmlFor="LostFound" className={css.filterLostFound}>
                  {t('ModalAddNotice.lostFound')}
                </label>

                <input
                  className={css.radioInputFilter}
                  id="inGoodHands"
                  name="category"
                  type="radio"
                  value="for-free"
                  onChange={formik.handleChange}
                  checked={formik.values.category === 'for-free'}
                />
                <label htmlFor="inGoodHands" className={css.filterInGoodHands}>
                  {t('ModalAddNotice.goodHands')}
                </label>

                <input
                  className={css.radioInputFilter}
                  id="sell"
                  name="category"
                  type="radio"
                  value="sell"
                  onChange={formik.handleChange}
                  checked={formik.values.category === 'sell'}
                />
                <label className={css.filterSell} htmlFor="sell">
                  {t('ModalAddNotice.forSale')}
                </label>
              </div>
              {formik.touched.category && formik.errors.category ? (
                <p className={css.inputError}>{formik.errors.category}</p>
              ) : null}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="titleAd">
              {t('ModalAddNotice.title')}
              <span className={css.reqiuredFieldForm}>*</span>
              {formik.values.title !== '' && formik.errors.title ? (
                <p className={css.inputError}>{formik.errors.title}</p>
              ) : null}
            </label>
            <input
              className={css.noticeFormInput}
              id="titleAd"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder={t('ModalAddNotice.enterTitlePlaceholder')}
            />

            <label className={css.noticeInputTitle} htmlFor="namePet">
              {t('ModalAddNotice.petName')}
              <span className={css.reqiuredFieldForm}>*</span>
              {formik.values.name !== '' && formik.errors.name ? (
                <p className={css.inputError}>{formik.errors.name}</p>
              ) : null}
            </label>

            <input
              className={css.noticeFormInput}
              id="namePet"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('ModalAddNotice.enterPetName')}
            />

            <label className={css.noticeInputTitle} htmlFor="birthdayPet">
              {t('ModalAddNotice.birthdate')}
              <span className={css.reqiuredFieldForm}>*</span>
              {formik.values.birthday !== '' && formik.errors.birthday ? (
                <p className={css.inputError}>{formik.errors.birthday}</p>
              ) : null}
            </label>

            <input
              className={css.noticeFormInputDate}
              id="birthdayPet"
              name="birthday"
              type="date"
              max={new Date().toISOString().split('T')[0]}
              onChange={formik.handleChange}
              value={formik.values.birthday}
            />

            <label className={css.noticeInputTitle} htmlFor="breedPet">
              {t('ModalAddNotice.breed')}
              <span className={css.reqiuredFieldForm}>*</span>
              {formik.values.breed && formik.errors.breed ? (
                <p className={css.inputError}>{formik.errors.breed}</p>
              ) : null}
            </label>

            <input
              className={css.noticeFormInput}
              id="breedPet"
              name="breed"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.breed}
              placeholder={t('ModalAddNotice.enterBreedPlaceholder')}
            />
          </>
        ) : (
          <>
            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeSexPetTitle}>
                {t('ModalAddNotice.gender')}
                <span className={css.reqiuredFieldForm}>*</span>:
              </legend>
              <div className={css.sexPetCheckWrapper}>
                <div className={css.sexPetWrapperMale}>
                  <input
                    className={css.radioInputSex}
                    id="malePet"
                    name="sex"
                    type="radio"
                    value="male"
                    checked={formik.values.sex === 'male'}
                    onChange={formik.handleChange}
                  />

                  <label
                    htmlFor="malePet"
                    className={css.noticeInputRadioTitle}
                  >
                    {t('ModalAddNotice.male')}
                  </label>
                </div>

                <div className={css.sexPetWrapperFemale}>
                  <input
                    className={css.radioInputSex}
                    id="femalePet"
                    name="sex"
                    type="radio"
                    value="female"
                    checked={formik.values.sex === 'female'}
                    onChange={formik.handleChange}
                  />

                  <label
                    htmlFor="femalePet"
                    className={css.noticeInputRadioTitle}
                  >
                    {t('ModalAddNotice.female')}
                  </label>
                </div>
              </div>
              {formik.touched.sex && formik.errors.sex ? (
                <p className={css.inputError}>{formik.errors.sex}</p>
              ) : null}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="locationPet">
              {t('ModalAddNotice.location')}
              <span className={css.reqiuredFieldForm}>*</span>:
              {formik.values.location !== '' && formik.errors.location ? (
                <p className={css.inputError}>{formik.errors.location}</p>
              ) : null}
            </label>

            <Location
              setLocationInfo={setLocationInfo}
              isLocation={formik.values.location}
            />

            {formik.values.category === 'sell' ? (
              <>
                <label htmlFor="pricePet" className={css.noticeInputTitle}>
                  {t('ModalAddNotice.price')}
                  <span className={css.reqiuredFieldForm}>*</span>:
                  {formik.values.price !== '' && formik.errors.price ? (
                    <p className={css.inputError}>{formik.errors.price}</p>
                  ) : null}
                </label>

                <input
                  className={css.noticeFormInput}
                  id="pricePet"
                  name="price"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  placeholder={t('ModalAddNotice.enterPricePlaceholder')}
                />
              </>
            ) : null}

            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>
                {t('ModalAddNotice.petPhoto')}
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
                  <input
                    className={css.imgPetInput}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
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
              {t('ModalAddNotice.comment')}
              <span className={css.reqiuredFieldForm}>*</span>
              {formik.values.comments !== '' && formik.errors.comments ? (
                <p className={css.inputError}>{formik.errors.comments}</p>
              ) : null}
            </label>
            <textarea
              className={css.noticeFormInput}
              id="commentsAd"
              name="comments"
              type="text"
              maxLength="120"
              rows={5}
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
              disabled={disableNextButton}
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
              disabled={!formik.isValid || isLoading}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ModalAddNotice;
