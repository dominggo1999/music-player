import React from 'react';
import { Cover, PlaceholderContent } from './MusicCover.style';
import AudioVisualizer from '../AudioVisualizer/AudioVisualizer';
import useActiveSongStore from '../../store/useActiveSongStore';

const MusicCover = ({ cover }) => {
  const vinyl = './cover-placeholder.png';
  const isPlaying = useActiveSongStore((state) => state.activeSong.isPlay);

  const handleClick = () => {
    const audio = document.querySelector('audio');
    if(audio.paused) {
      audio.play();
    }else{
      audio.pause();
    }
  };

  return (
    <Cover onClick={handleClick}>
      <img
        src={vinyl}
        alt=""
      />
      <PlaceholderContent>
        {!cover ? (
          <>
            <p>
              GeWxEe
            </p>
            <p>
              {isPlaying ? '- Pause -' : '- Play -'}
            </p>
          </>
        )
          : (
            <img
              src={cover}
              alt="Cover"
            />
          )}
      </PlaceholderContent>
      <AudioVisualizer />
    </Cover>
  );
};

export default MusicCover;
