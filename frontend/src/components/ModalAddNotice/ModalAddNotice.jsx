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

const ModalAddNotice = ({ closeButton }) => {
  const [createNotice] = useCreateNoticeMutation();
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
      category: Yup.string().required('Оберіть категорію'),
      title: Yup.string()
        .required('Введіть заголовок')
        .min(2, 'Мінімум 2 символи')
        .matches(
          /^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/,
          'Заголовок містить лише літери і пробіли'
        )
        .trim()
        .max(48, 'Максимум 48 символів'),
      name: Yup.string()
        .trim()
        .min(2, 'Мінімум 2 символи')
        .required("Введіть ім'я тварини")
        .matches(
          /^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/,
          'Ім’я містить лише літери і пробіли'
        )
        .max(16, 'Максимум 16 символів'),
      birthday: Yup.date()
        .required('Оберіть дату народження')
        .max(new Date(), 'Дата має бути в минулому'),
      breed: Yup.string()
        .required('Введіть породу')
        .min(2, 'Мінімум 2 символи')
        .matches(/^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/, 'only letters')
        .trim()
        .max(24, 'Максимум 24 символи'),
      location: Yup.string().required('Введіть місце знаходження'),
      sex: Yup.string().required('Оберіть стать'),
      price: Yup.string().when('category', {
        is: category => category === 'sell',
        then: Yup.string()
          .required('Введіть ціну')
          .matches(/^[0-9][0-9]*$/, 'Тільки цифри'),
      }),
      comments: Yup.string()
        .trim()
        .required('Введіть опис')
        .min(8, 'Мінімум 8 символів')
        .max(120, 'Максимум 120 символів'),
    }),
    onSubmit: async () => {
      try {
        await createNotice(formDataAppender(formik.values)).unwrap();
        toast.success('Ви успішно створили оголошення.');
        formik.resetForm();
        closeButton();
      } catch (error) {
        toast.error('Упс, щось пішло не так, спробуйте ще раз.');
      }
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
      <h2 className={css.noticeFormTitle}>Нове оголошення</h2>
      <form className={css.noticeForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <p className={css.noticeFormText}>
              Додайте базову інвормацію про тваринку
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
                  загубив/знайшов
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
                  у добрі руки
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
                  продаж
                </label>
              </div>
              {formik.touched.category && formik.errors.category ? (
                <p className={css.inputError}>{formik.errors.category}</p>
              ) : null}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="titleAd">
              Заголовок<span className={css.reqiuredFieldForm}>*</span>
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
              placeholder="Введіть заголовок оголошення"
            />

            <label className={css.noticeInputTitle} htmlFor="namePet">
              Ім'я тварини<span className={css.reqiuredFieldForm}>*</span>
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
              placeholder="Введіть ім'я тварини"
            />

            <label className={css.noticeInputTitle} htmlFor="birthdayPet">
              Дата народження<span className={css.reqiuredFieldForm}>*</span>
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
              Порода<span className={css.reqiuredFieldForm}>*</span>
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
              placeholder="Введіть породу тварини"
            />
          </>
        ) : (
          <>
            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeSexPetTitle}>
                Стать<span className={css.reqiuredFieldForm}>*</span>:
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
                    чоловіча
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
                    жіноча
                  </label>
                </div>
              </div>
              {formik.touched.sex && formik.errors.sex ? (
                <p className={css.inputError}>{formik.errors.sex}</p>
              ) : null}
            </fieldset>

            <label className={css.noticeInputTitle} htmlFor="locationPet">
              Місто, Область<span className={css.reqiuredFieldForm}>*</span>:
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
                  Ціна<span className={css.reqiuredFieldForm}>*</span>:
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
                  placeholder="Введіть ціну"
                />
              </>
            ) : null}

            <fieldset className={css.inputWrapper}>
              <legend className={css.noticeInputTitle}>Фото тварини</legend>
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
              Коментар<span className={css.reqiuredFieldForm}>*</span>
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
              disabled={!formik.isValid}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ModalAddNotice;
