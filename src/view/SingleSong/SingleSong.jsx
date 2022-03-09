import React, { useEffect, useRef, useState } from 'react';
import { SingleSongWrapper } from './SingleSong.style';
import SongCover from '../../layout/MusicCover/MusicCover';
import MusicInfo from '../../layout/MusicInfo/MusicInfo';
import useActiveSongStore from '../../store/useActiveSongStore';
import useListStore from '../../store/useListStore';
import NoLibraryMessage from '../../layout/NoLibraryMessage/NoLibraryMessage';
import { SearchIndicator, LoadingIndicatorWrapper, LoadingText } from '../../common/LoadingIndicator';

const SingleSong = ({ chooseDirectory, loading }) => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const songs = useListStore((state) => state.list.songs);

  console.log(songs);

  if(loading) {
    return (
      <LoadingIndicatorWrapper>
        <SearchIndicator />
        <LoadingText>Scanning folder..</LoadingText>
      </LoadingIndicatorWrapper>
    );
  }

  if(!activeSong) {
    return (
      <NoLibraryMessage chooseDirectory={chooseDirectory} />
    );
  }

  const targetSongIndex = songs.map((i) => i.path).indexOf(activeSong);

  const { cover, ...rest } = songs[targetSongIndex];

  return (
    <SingleSongWrapper>
      <SongCover cover={cover} />
      <MusicInfo {...rest} />
    </SingleSongWrapper>
  );
};

export default SingleSong;
