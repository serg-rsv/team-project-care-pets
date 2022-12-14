import { useState } from 'react';
import { useFormik } from 'formik';
import css from './modalAddNotice.module.scss';
import * as Yup from 'yup';
import Button from '../Button/Button';
import { useLocation } from 'react-router-dom';

import { useCreateNoticeMutation } from '../../redux/services/noticesSlice';
import { formDataAppender } from '../../helpers/formDataAppender';

import Location from '../Location';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
// import e from 'cors';

const ModalAddNotice = ({ closeButton }) => {
  const [createNotice, { isLoading }] = useCreateNoticeMutation();
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const { pathname } = useLocation();

  const categorySetByDefault = () => {
    const enterPoint = pathname.split('/').pop();
    return enterPoint === 'notices' ? 'sell' : enterPoint;
  };

  const moveNextRegistration = () => {
    isFirstRegisterStep
      ? setIsFirstRegisterStep(false)
      : setIsFirstRegisterStep(true);
  };

  // const canMoveForward = () => {
  //   const { category, title, name, date, breed } = formik.values;
  //   if (category && title && name && date && breed) {
  //     return false;
  //   }
  //   return true;
  // };

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
      category: Yup.string().required('?????????????? ??????????????????'),
      title: Yup.string()
        .required('?????????????? ??????????????????')
        .min(2, '?????????????? 2 ??????????????')
        .matches(
          /^([??-????-??????????????????????'\s]+|[a-zA-Z\s]+){2,}$/,
          '?????????????????? ?????????????? ???????? ???????????? ?? ??????????????'
        )
        .trim()
        .max(48, '???????????????? 48 ????????????????'),
      name: Yup.string()
        .trim()
        .min(2, '?????????????? 2 ??????????????')
        .required("?????????????? ????'?? ??????????????")
        .matches(
          /^([??-????-??????????????????????'\s]+|[a-zA-Z\s]+){2,}$/,
          '????????? ?????????????? ???????? ???????????? ?? ??????????????'
        )
        .max(16, '???????????????? 16 ????????????????'),
      birthday: Yup.date()
        .required('?????????????? ???????? ????????????????????')
        .max(new Date(), '???????? ?????? ???????? ?? ????????????????'),
      breed: Yup.string()
        .required('?????????????? ????????????')
        .min(2, '?????????????? 2 ??????????????')
        .matches(/^([??-????-??????????????????????'\s]+|[a-zA-Z\s]+){2,}$/, 'only letters')
        .trim()
        .max(24, '???????????????? 24 ??????????????'),
      location: Yup.string().required('?????????????? ?????????? ??????????????????????'),
      sex: Yup.string().required('?????????????? ??????????'),
      price: Yup.string().when('category', {
        is: category => category === 'sell',
        then: Yup.string()
          .required('?????????????? ????????')
          .matches(/^[0-9][0-9]*$/, '???????????? ??????????'),
      }),
      comments: Yup.string()
        .trim()
        .required('?????????????? ????????')
        .min(8, '?????????????? 8 ????????????????')
        .max(120, '???????????????? 120 ????????????????'),
    }),
    onSubmit: async () => {
      await createNotice(formDataAppender(formik.values))
        .unwrap()
        .then(() => {
          toast.success('???? ?????????????? ???????????????? ????????????????????.');
        })
        .catch(() => {
          toast.error('???? ?????????????? ???????????????? ????????????????????.');
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
      <h2 className={css.noticeFormTitle}>???????? ????????????????????</h2>
      <form className={css.noticeForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <p className={css.noticeFormText}>
              ?????????????? ???????????? ???????????????????? ?????? ????????????????
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
                  ??????????????/??????????????
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
                  ?? ?????????? ????????
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
                  ????????????
                </label>
              </div>
              {formik.touched.category && formik.errors.category ? (
                <p className={css.inputError}>{formik.errors.category}</p>
              ) : null}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="titleAd">
              ??????????????????<span className={css.reqiuredFieldForm}>*</span>
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
              placeholder="?????????????? ?????????????????? ????????????????????"
            />

            <label className={css.noticeInputTitle} htmlFor="namePet">
              ????'?? ??????????????<span className={css.reqiuredFieldForm}>*</span>
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
              placeholder="?????????????? ????'?? ??????????????"
            />

            <label className={css.noticeInputTitle} htmlFor="birthdayPet">
              ???????? ????????????????????<span className={css.reqiuredFieldForm}>*</span>
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
              ????????????<span className={css.reqiuredFieldForm}>*</span>
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
              placeholder="?????????????? ???????????? ??????????????"
            />
          </>
        ) : (
          <>
            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeSexPetTitle}>
                ??????????<span className={css.reqiuredFieldForm}>*</span>:
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
                    ????????????????
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
                    ????????????
                  </label>
                </div>
              </div>
              {formik.touched.sex && formik.errors.sex ? (
                <p className={css.inputError}>{formik.errors.sex}</p>
              ) : null}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="locationPet">
              ??????????, ??????????????<span className={css.reqiuredFieldForm}>*</span>:
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
                  ????????<span className={css.reqiuredFieldForm}>*</span>:
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
                  placeholder="?????????????? ????????"
                />
              </>
            ) : null}

            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>???????? ??????????????</legend>
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
              ????????????????<span className={css.reqiuredFieldForm}>*</span>
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
