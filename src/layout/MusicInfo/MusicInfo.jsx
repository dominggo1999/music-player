import React from 'react';
import { MusicInfoWrapper, Title, Artist } from './MusicInfo.style';

const MusicInfo = ({ title, artist }) => {
  return (
    <MusicInfoWrapper>
      <Title>{title}</Title>
      <Artist>{artist}</Artist>
    </MusicInfoWrapper>
  );
};

export default MusicInfo;
