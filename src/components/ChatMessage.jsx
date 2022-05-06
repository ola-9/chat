import React from 'react';

const ChatMessage = ({ message }) => {
  // console.log('message in ChatMessage', message);
  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box">
      <div className="text-break mb-2">
        <b>{message.author}</b>
        :&nbsp;
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
