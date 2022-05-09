import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const getChannelSchema = (data) => yup.object({
  name: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .notOneOf(data),
});

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
        .min(6, t('card.form.errors.minMax')),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], t('card.form.errors.passwordConfirmation')),
    });
};
