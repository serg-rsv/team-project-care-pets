import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCreatePetMutation } from '../../redux/services/petsSlice';
import { formDataAppender } from '../../helpers/formDataAppender';
import Button from '../Button/Button';
import css from './modalAddPet.module.scss';

const ModalAddPet = ({ onCancelButtonClick }) => {
  const { t } = useTranslation('common');
  const [createPet, { isLoading }] = useCreatePetMutation();
  const [isFirstRegisterStep, setIsFirstRegisterStep] = useState(true);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [image, setImage] = useState(null);

  const moveNextRegistration = () => {
    isFirstRegisterStep
      ? setIsFirstRegisterStep(false)
      : setIsFirstRegisterStep(true);
  };

  const onImageChange = e => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      formik.setFieldValue('image', e.currentTarget.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      birthday: '',
      breed: '',
      image: '',
      comments: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .trim()
        .required(t('ModalAddPet.fieldRequired'))
        .matches(
          /^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/,
          t('ModalAddPet.lettersAndSpacesOnly')
        )
        .min(2, t('ModalAddPet.nameMinLength'))
        .max(16, t('ModalAddPet.nameMaxLength')),
      birthday: Yup.date().required(t('ModalAddPet.fieldRequired')),
      breed: Yup.string()
        .required(t('ModalAddPet.fieldRequired'))
        .matches(
          /^([А-Яа-яЁёЇїІіЄєҐґ'\s]+|[a-zA-Z\s]+){2,}$/,
          t('ModalAddPet.lettersAndSpacesOnly')
        )
        .min(2, t('ModalAddPet.breedMinLength'))
        .max(16, t('ModalAddPet.breedMaxLength')),
      comments: Yup.string()
        .required(t('ModalAddPet.fieldRequired'))
        .min(8, t('ModalAddPet.commentMinLength'))
        .max(120, t('ModalAddPet.commentMaxLength')),
    }),
    onSubmit: async () => {
      await createPet(formDataAppender(formik.values))
        .unwrap()
        .then(() => {
          toast.success(
            t('ModalAddPet.successfullyAdded', {
              name: formik.values.name,
            })
          );
        })
        .catch(() => {
          toast.error(
            t('ModalAddPet.failedToAdd', {
              name: formik.values.name,
            })
          );
        });
      formik.resetForm();
      onCancelButtonClick();
    },
  });

  useEffect(() => {
    const firstStepPossibleErrors = ['name', 'birthday', 'breed'];
    const isValidFieldsInFirstStep = !Object.keys(formik.errors).some(error =>
      firstStepPossibleErrors.includes(error)
    );
    isValidFieldsInFirstStep && formik.values.name.length > 0
      ? setDisableNextButton(false)
      : setDisableNextButton(true);
  }, [formik, disableNextButton]);

  return (
    <div className={css.formBlock}>
      <h2 className={css.formTitle}>{t('ModalAddPet.newAnimal')}</h2>
      <form className={css.addPetForm} onSubmit={formik.handleSubmit}>
        {isFirstRegisterStep ? (
          <>
            <label className={css.addPetInputTitle} htmlFor="name">
              {t('ModalAddPet.name')}
            </label>
            {formik.values.name !== '' && formik.errors.name ? (
              <p className={css.inputError}>{formik.errors.name}</p>
            ) : null}
            <input
              className={css.addPetFormInput}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('ModalAddPet.enterName')}
            />

            <label className={css.addPetInputTitle} htmlFor="birthday">
              {t('ModalAddPet.birthDate')}
            </label>
            {formik.values.birth !== '' && formik.errors.birth ? (
              <p className={css.inputError}>{formik.errors.birth}</p>
            ) : null}
            <input
              className={css.addPetFormInputDate}
              id="birthdayPet"
              name="birthday"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.birthday}
            />

            <label className={css.addPetInputTitle} htmlFor="breed">
              {t('ModalAddPet.breed')}
            </label>
            {formik.values.breed && formik.errors.breed ? (
              <p className={css.inputError}>{formik.errors.breed}</p>
            ) : null}
            <input
              className={css.addPetFormInput}
              id="breed"
              name="breed"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.breed}
              placeholder={t('ModalAddPet.enterBreed')}
            />
          </>
        ) : (
          <>
            <fieldset className={css.inputWrapper}>
              <legend className={css.addPhotoPetTitle}>
                {t('ModalAddPet.addPhotoAndComments')}
              </legend>
              {formik.values.image === '' ? (
                <label className={css.photoAddIcon} htmlFor="imagePet">
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
                    className={css.photoPetInput}
                    id="imagePet"
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
                  <img alt="pet" src={image} />
                </div>
              )}
            </fieldset>
            <div className={css.textareaBlock}>
              <label className={css.addPetCommentsTitle} htmlFor="comments">
                {t('ModalAddPet.comments')}
              </label>
              {formik.values.comments !== '' && formik.errors.comments ? (
                <p className={css.inputError}>{formik.errors.comments}</p>
              ) : null}
              <textarea
                className={css.addPetFormComments}
                id="comments"
                name="comments"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.comments}
              />
            </div>
          </>
        )}

        {isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children={t('ModalAddPet.cancel')}
              onClick={onCancelButtonClick}
              className={css.btnAccent}
            />
            <Button
              children={t('ModalAddPet.next')}
              onClick={moveNextRegistration}
              className={css.btnSec}
              disabled={disableNextButton}
            />
          </div>
        )}

        {!isFirstRegisterStep && (
          <div className={css.btnBlock}>
            <Button
              children={t('ModalAddPet.back')}
              onClick={moveNextRegistration}
              className={css.btnAccent}
            />
            <Button
              disabled={!formik.isValid || isLoading}
              children={t('ModalAddPet.add')}
              buttonType="submit"
              className={css.btnSec}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ModalAddPet;
