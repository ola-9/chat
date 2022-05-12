import React from 'react';
// import { filter } from 'leo-profanity';
// const filter = require('leo-profanity');
import filter from 'leo-profanity';

// Настройка различных библиотек в init
// filter.clearList();
// filter.add(filter.getDictionary('en'));
// filter.add(filter.getDictionary('ru'));

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
