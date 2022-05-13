import React from 'react';
import filter from 'leo-profanity';

const ChatMessage = ({ message }) => {
  const { author, text } = message;

  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box">
      <div className="text-break mb-2">
        <b>{author}</b>
        :&nbsp;
        {filter.clean(text)}
      </div>
    </div>
  );
};

export default ChatMessage;
