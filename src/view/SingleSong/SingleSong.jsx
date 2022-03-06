import React from 'react';
import { SingleSongWrapper } from './SingleSong.style';
import SongCover from '../../layout/MusicCover/MusicCover';
import MusicInfo from '../../layout/MusicInfo/MusicInfo';
import useActiveSongStore from '../../store/useActiveSongStore';
import useListStore from '../../store/useListStore';

const SingleSong = () => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const songs = useListStore((state) => state.list.songs);

  if(!activeSong) return <p>loading</p>;

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
