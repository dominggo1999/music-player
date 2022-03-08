import React from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import EqualizerIcon from './EqualizerIcon';
import { ControlButton } from './LibraryTable.style';
import useActiveSongStore from '../../store/useActiveSongStore';

const TableActionButton = ({
  id,
  isActive,
  togglePlay,
  filePath,
}) => {
  if(!isActive) {
    return (
      <>
        <span>{id + 1}</span>
        <ControlButton onClick={() => togglePlay(filePath)}>
          <BsFillPlayFill />
        </ControlButton>
      </>
    );
  }

  const isPlay = useActiveSongStore((state) => state.activeSong.isPlay);

  return (
    <>
      {
        isPlay ? <EqualizerIcon /> : <span>{id + 1}</span>
      }

      <ControlButton onClick={() => togglePlay(filePath)}>
        {isPlay
          ? <BsPauseFill />
          : <BsFillPlayFill />}
      </ControlButton>
    </>
  );
};

export default TableActionButton;
