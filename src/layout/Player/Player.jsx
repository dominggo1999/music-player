import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { PlayerWrapper } from './Player.style';
import 'react-h5-audio-player/lib/styles.css';
import useActiveSongStore from '../../store/useActiveSongStore';

const Player = () => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);

  const handleEnded = () => {
    console.log('ened');
  };

  return (
    <PlayerWrapper>
      <AudioPlayer
        autoPlay
        src={`atom://${activeSong}`}
        hasDefaultKeyBindings={false}
        autoPlayAfterSrcChange={false}
        muted
        showFilledVolume
        onEnded={handleEnded}
      />
    </PlayerWrapper>
  );
};

export default Player;
