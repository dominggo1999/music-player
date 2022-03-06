import React from 'react';
import { Cover } from './MusicCover.style';

const MusicCover = ({ cover }) => {
  const songCover = cover || 'https://upload.wikimedia.org/wikipedia/id/a/a7/Raisa_handmade.jpeg';

  return (
    <Cover>
      <img
        src={songCover}
        alt=""
      />
    </Cover>
  );
};

export default MusicCover;
