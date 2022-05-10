import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const getChannelSchema = (data) => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat.modals.add.errors' });

  return yup.object({
    name: yup
      .string()
      .required(t('required'))
      .min(3, t('minMax'))
      .max(20, t('minMax'))
      .notOneOf(data, t('notUnique')),
  });
};

export const getSignupSchema = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' });

  return yup
    .object()
    .shape({
      username: yup
        .string()
        .required(t('card.form.errors.required'))
        .min(3, t('card.form.errors.minMax'))
        .max(20, t('card.form.errors.minMax')),
      password: yup
        .string()
        .required(t('card.form.errors.required'))
        .min(6, t('card.form.errors.min')),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], t('card.form.errors.passwordConfirmation')),
    });
};
