import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import notFoundImage from '../../assets/404.jpg';

const NotFound = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'notFound' });

  return (
    <Container className="text-center">
      <img
        alt={t('alt')}
        className="img-fluid"
        src={notFoundImage}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <h1 className="h4 text-muted">{t('header')}</h1>
      <p className="text-muted">
        {t('text1')}
        &nbsp;
        <a href="/">{t('text2')}</a>
      </p>
    </Container>
  );
};

export default NotFound;
