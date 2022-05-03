import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { actions } from '../slices/messagesSlice.js';

const NewMesageInput = ({ socket, currChannelId, username }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values) => {
      formik.resetForm();
      const newMessage = {
        text: values.text,
        channelId: currChannelId,
        author: username,
      };
      socket.emit('newMessage', newMessage); // send msg to socket server
    },
  });

  useEffect(() => {
    // inputRef.current.focus();
    socket.on('newMessage', (message) => {
      // console.log('message inside useEffect: ', message);
      dispatch(actions.addMessage(message));
    });
  }, [socket]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="d-flex">
          <Form.Control
            className="me-2"
            onChange={formik.handleChange}
            value={formik.values.text}
            placeholder="Введите сообщение..."
            name="text"
            id="text"
            ref={inputRef}
          />
          <Button type="submit" variant="primary">Отправить</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewMesageInput;
