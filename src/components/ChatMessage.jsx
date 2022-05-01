import React from 'react';

const ChatMessage = (props) => {
  console.log('props in chat msg: ', props);
  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box">
      <div className="text-break mb-2">
        <b>User 1</b>
        :
        тестовое сообщение
      </div>
    </div>
  );
};

export default ChatMessage;
