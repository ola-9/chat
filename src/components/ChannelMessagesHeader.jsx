import React from 'react';

const ChannelMessagesHeader = (props) => {
  console.log('props in msg header: ', props);
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># general</b>
      </p>
      <span className="text-muted">188 сообщений</span>
    </div>
  );
};

export default ChannelMessagesHeader;
