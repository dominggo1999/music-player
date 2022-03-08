import React from 'react';
import useActiveSongStore from '../../store/useActiveSongStore';
import TableBodyRow from './TableBodyRow';

const TableBody = ({
  rows, getTableBodyProps, prepareRow,
}) => {
  const { send } = window.api;
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const updateAutoplay = useActiveSongStore((state) => state.updateAutoplay);

  const togglePlay = (path) => {
    if(path !== activeSong) {
      updateAutoplay(true);
      updateActiveSong(path);
      send('save-active-song', path);
    }else{
      const audio = document.querySelector('audio');
      if(audio.paused) {
        audio.play();
      }else{
        audio.pause();
      }
    }
  };

  return (
    <tbody {...getTableBodyProps()}>
      {rows.map(
        (row, id) => {
          return (
            <TableBodyRow
              key={row.id}
              row={row}
              prepareRow={prepareRow}
              activeSong={activeSong}
              togglePlay={togglePlay}
              id={id}
            />
          );
        },
      )}
    </tbody>
  );
};

export default TableBody;
