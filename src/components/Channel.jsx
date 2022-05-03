import React from 'react';
import cn from 'classnames';

const Channel = ({ channel, currChannelId }) => {
  const { id, name } = channel;

  const btnClass = cn('w-100 rounded-0 text-start btn', {
    'btn-secondary': id === currChannelId,
  });

  return (
    <li className="nav-item w-100">
      <button type="button" className={btnClass}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default Channel;
