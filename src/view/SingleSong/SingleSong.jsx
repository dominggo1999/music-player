import React from 'react';
import { SingleSongWrapper } from './SingleSong.style';
import SongCover from '../../layout/MusicCover/MusicCover';
import MusicInfo from '../../layout/MusicInfo/MusicInfo';

const SingleSong = () => {
  return (
    <SingleSongWrapper>
      <SongCover />
      <MusicInfo />
    </SingleSongWrapper>
  );
};

export default SingleSong;
