import React, { useState } from 'react';
import { SingleSongWrapper } from './SingleSong.style';
import SongCover from '../../layout/MusicCover/MusicCover';
import MusicInfo from '../../layout/MusicInfo/MusicInfo';
import useActiveSongStore from '../../store/useActiveSongStore';
import useListStore from '../../store/useListStore';
import useChooseDirectory from '../../hooks/useChooseDirectory';

const SingleSong = () => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const songs = useListStore((state) => state.list.songs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const chooseDirectory = useChooseDirectory({ setLoading, setError });

  if(!activeSong) return <button onClick={chooseDirectory}>open</button>;

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
