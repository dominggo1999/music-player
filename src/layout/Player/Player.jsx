import React, {
  createRef, useEffect, useMemo, useRef, useState,
} from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { PlayerWrapper } from './Player.style';
import 'react-h5-audio-player/lib/styles.css';
import useActiveSongStore from '../../store/useActiveSongStore';
import useListStore from '../../store/useListStore';
import VisualizerControl from './VisualizerControl';

const Player = ({ loading }) => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const updateIsPlay = useActiveSongStore((state) => state.updateIsPlay);
  const isAutoplay = useActiveSongStore((state) => state.activeSong.isAutoplay);
  const updateAutoplay = useActiveSongStore((state) => state.updateAutoplay);
  const { updateActiveSong, resetActiveSong } = useActiveSongStore((state) => state);
  const [shouldUpdateAutoPlay, setShouldUpdateAutoPlay] = useState(false);
  const { resetList } = useListStore((state) => state);
  const { send, receive } = window.api;

  const audioRef = useRef();

  const order = useListStore((state) => state.list.order);
  const sortedBy = useListStore((state) => state.list.sortedBy);

  const nextSong = () => {
    shouldUpdateAutoPlay && updateAutoplay(true);

    // Find index of current song
    const currentSongId = order.indexOf(activeSong);

    // Find the next song id
    let nextSongId = currentSongId + 1;
    nextSongId = nextSongId > order.length - 1 ? 0 : nextSongId;

    // Find the next song path
    const nextSongPath = order[nextSongId];

    updateActiveSong(nextSongPath);

    const audioElement = audioRef.current.audio.current;
    if (audioElement?.paused) {
      updateAutoplay(false);
    }
  };

  const previousSong = () => {
    shouldUpdateAutoPlay && updateAutoplay(true);

    // Find index of current song
    const currentSongId = order.indexOf(activeSong);

    // Find the next song id
    let prevSongId = currentSongId - 1;
    prevSongId = prevSongId === -1 ? order.length - 1 : prevSongId;

    // Find the next song path
    const prevSongPath = order[prevSongId];

    updateActiveSong(prevSongPath);
    const audioElement = audioRef.current.audio.current;
    if (audioElement?.paused) {
      updateAutoplay(false);
    }
  };

  const handleEnded = () => {
    nextSong();
  };

  const handlePlay = () => {
    updateAutoplay(true);
    updateIsPlay(true);
    setShouldUpdateAutoPlay(true);
  };

  const handlePause = () => {
    updateIsPlay(false);
  };

  const handleError = () => {
    resetList();
    resetActiveSong();

    send('reset');
  };

  useEffect(() => {
    audioRef.current.audio.current.setAttribute('id', 'audio-element');
  }, []);

  useEffect(() => {
    const unsubscribe = receive('reset', handleError);

    return () => {
      unsubscribe();
    };
  }, []);

  return useMemo(() => {
    return (
      <PlayerWrapper>
        <AudioPlayer
          src={activeSong && !loading ? `atom://${activeSong}` : ''}
          hasDefaultKeyBindings={false}
          autoPlayAfterSrcChange={isAutoplay}
          showFilledVolume
          showSkipControls
          showJumpControls={false}
          onEnded={!loading ? handleEnded : () => { }}
          onClickPrevious={!loading ? previousSong : () => { }}
          onClickNext={!loading ? nextSong : () => { }}
          onPlay={!loading ? handlePlay : () => { }}
          onPause={!loading ? handlePause : () => { }}
          ref={audioRef}
        />
        <VisualizerControl audioRef={audioRef} />
      </PlayerWrapper>
    );
  }, [activeSong, isAutoplay, shouldUpdateAutoPlay, JSON.stringify(sortedBy), loading]);
};

export default Player;
