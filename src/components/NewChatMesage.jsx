import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NewChatMesage = ({ socket, currChannelId, username }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      console.log('values!!!', values);
      formik.resetForm();
      const newMessage = {
        text: values.text,
        channelId: currChannelId,
        author: username,
        data: new Date(),
      };
      socket.emit('newMessage', newMessage, (data) => {
        console.log(data);
      });
    },
  });

  const { t } = useTranslation();

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="d-flex">
          <Form.Label
            htmlFor="text"
            className="visually-hidden"
          >
            {t('chat.messages.inputLabel')}
          </Form.Label>
          <Form.Control
            className="me-2"
            onChange={formik.handleChange}
            value={formik.values.text}
            placeholder={t('chat.messages.inputPlaceholder')}
            name="text"
            id="text"
            ref={inputRef}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={formik.values.text.length === 0}
          >
            {t('chat.messages.sendMessageBtn')}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewChatMesage;
