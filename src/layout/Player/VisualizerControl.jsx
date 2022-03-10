import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useActiveSongStore from '../../store/useActiveSongStore';

const VisualizerControl = ({ audioRef: ref }) => {
  if(!ref.current) return null;
  const activeSong = useActiveSongStore((state) => state.activeSong);

  if(!activeSong) return null;

  const { pathname } = useLocation();

  const audioElement = ref.current.audio.current;
  const audioContext = useRef();
  const analyser = useRef();
  const mediaElement = useRef();
  const canvasElement = useRef();
  const canvasContext = useRef();
  const animationId = useRef();

  const mainLoop = () => {
    const canvWidth = canvasElement.current.width;
    const canvHeight = canvasElement.current.height;

    const cx = canvWidth / 2; // center X
    const cy = canvHeight / 2; // center Y
    const r = Math.round((canvasElement.current.width / 2) * 0.7);
    const lineWidth = 5;
    const lineSpace = 2;
    const arcStep = Math.ceil(lineWidth + lineSpace);
    const frqBits = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(frqBits);
    const step = ((lineWidth + lineSpace) / dataArray.length) * (2 * Math.PI);
    const barLen = (canvWidth / 2) - r;
    let angle = Math.PI * 1.7; // start from top

    canvasContext.current.clearRect(0, 0, canvWidth, canvHeight);
    canvasContext.current.fillStyle = 'rgba(14, 16, 17, 0)';
    canvasContext.current.fillRect(0, 0, canvWidth, canvHeight);

    analyser.current.getByteFrequencyData(dataArray);

    canvasContext.current.lineWidth = 2;
    canvasContext.current.strokeStyle = '#FFC931';

    dataArray.forEach((_, index) => {
      angle += step;
      if (index % arcStep) {
        return;
      }
      const bits = Math.round(dataArray.slice(index, index + arcStep)
        .reduce((v, t) => t + v, 0) / arcStep);

      const blen = r + ((bits / 255.0) * (barLen * 1.3));
      canvasContext.current.beginPath();
      canvasContext.current.moveTo(r * Math.cos(angle) + cx, r * Math.sin(angle) + cy);
      canvasContext.current.lineTo(blen * Math.cos(angle) + cx, blen * Math.sin(angle) + cy);
      canvasContext.current.stroke();
    });

    animationId.current = requestAnimationFrame(mainLoop);
  };

  const setAnalyser = () => {
    audioContext.current = audioContext.current || new AudioContext();
    analyser.current = analyser.current || audioContext.current.createAnalyser();

    mediaElement.current = mediaElement.current || audioContext.current.createMediaElementSource(audioElement);

    mediaElement.current.connect(analyser.current);

    analyser.current.connect(audioContext.current.destination);
  };

  const handlePlay = (e) => {
    canvasElement.current = document.getElementById('audio-visualizer');
    if(canvasElement.current) {
      canvasElement.current = document.getElementById('audio-visualizer');
      canvasContext.current = canvasElement.current.getContext('2d');

      if(!audioContext.current) {
        setAnalyser();
      }else {
        audioContext.current.resume();
      }

      if(!animationId.current) {
        mainLoop();
      }
    }else{
      audioContext.current.resume();
    }
  };

  const handlePause = () => {
    canvasElement.current = document.getElementById('audio-visualizer');
    if(canvasElement.current) {
      audioContext.current.suspend();
      cancelAnimationFrame(animationId.current);
    }
    animationId.current = undefined;
  };

  useEffect(() => {
    audioElement.addEventListener('playing', handlePlay);
    audioElement.addEventListener('pause', handlePause);

    if(!audioElement.paused) {
      handlePlay();
    }

    return () => {
      audioElement.removeEventListener('playing', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
    };
  }, [pathname]);

  useEffect(() => {
    if(pathname !== '/') {
      cancelAnimationFrame(animationId.current);
      animationId.current = undefined;
    }
  }, [pathname]);

  return null;
};

export default VisualizerControl;
