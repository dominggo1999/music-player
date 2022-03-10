import React from 'react';
import { VisualizerWrapper } from './AudioVisualizer.style';

const AudioVisualizer = () => {
  return (
    <VisualizerWrapper>
      <canvas
        width={280 * (1 / 0.7)}
        height={280 * (1 / 0.7)}
        id="audio-visualizer"
      >
      </canvas>
    </VisualizerWrapper>
  );
};

export default AudioVisualizer;
