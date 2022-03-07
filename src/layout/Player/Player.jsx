import React, { useEffect, useMemo } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { PlayerWrapper } from './Player.style';
import 'react-h5-audio-player/lib/styles.css';
import useActiveSongStore from '../../store/useActiveSongStore';
import useListStore from '../../store/useListStore';

const Player = () => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const isAutoplay = useActiveSongStore((state) => state.activeSong.isAutoplay);
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const updateAutoplay = useActiveSongStore((state) => state.updateAutoplay);
  const sortedList = useListStore((state) => state.list.sortedList);
  const playlist = useListStore((state) => state.list.playlist);

  // Index of active song
  const targetSong = playlist.filter((i) => i.path === activeSong)[0];
  const activeSongIndex = playlist.indexOf(targetSong);

  const nextSong = () => {
    updateAutoplay(true);

    // find active song index in sortedList
    const activeSongPosition = sortedList.indexOf(`${activeSongIndex}`);

    // Find the next song position in sorted list
    let nextSongPosition = activeSongPosition + 1;
    nextSongPosition = nextSongPosition > sortedList.length - 1 ? 0 : nextSongPosition;

    // Find the next song id in playlist
    const nextSongId = sortedList[nextSongPosition];

    // Get next song path
    const nextSongPath = playlist[nextSongId].path;

    // Update active song
    updateActiveSong(nextSongPath);
  };

  const previousSong = () => {
    updateAutoplay(true);

    // find active song index in sortedList
    const activeSongPosition = sortedList.indexOf(`${activeSongIndex}`);

    // Find the previous song position in sorted list
    let nextSongPosition = activeSongPosition - 1;
    nextSongPosition = nextSongPosition < 0 ? sortedList.length - 1 : nextSongPosition;

    // Find the previous song id in playlist
    const nextSongId = sortedList[nextSongPosition];

    // Get previous song path
    const nextSongPath = playlist[nextSongId].path;

    // Update active song
    updateActiveSong(nextSongPath);
  };

  const handleEnded = () => {
    nextSong();
  };

  const handlePlay = () => {
  };

  return useMemo(() => {
    return (
      <PlayerWrapper>
        <AudioPlayer
          src={activeSong ? `atom://${activeSong}` : ''}
          hasDefaultKeyBindings={false}
          autoPlayAfterSrcChange={isAutoplay}
          showFilledVolume
          onEnded={handleEnded}
          showSkipControls
          showJumpControls={false}
          onClickPrevious={previousSong}
          onClickNext={nextSong}
          onPlay={handlePlay}
        />
      </PlayerWrapper>
    );
  },
  [activeSong, isAutoplay]);
};

export default Player;
