import React, { useState } from 'react';
import TableActionButton from './TableActionButton';

import useActiveSongStore from '../../store/useActiveSongStore';

const TableBodyRow = ({
  row,
  prepareRow,
  togglePlay,
  id,
}) => {
  const activeSong = useActiveSongStore((state) => state.activeSong.path);
  const filePath = row.original.path;
  const isActive = activeSong === filePath;

  const className = isActive ? 'now-playing' : null;
  prepareRow(row);

  return (
    <tr
      className={className}
      onDoubleClick={() => togglePlay(filePath)}
      {...row.getRowProps()}
    >
      <td>
        <TableActionButton
          togglePlay={togglePlay}
          id={id}
          filePath={filePath}
          activeSong={activeSong}
          isActive={isActive}
        />
      </td>
      {row.cells.map((cell) => {
        return (
          <td {...cell.getCellProps()}><span>{cell.render('Cell')}</span></td>
        );
      })}
    </tr>
  );
};

export default TableBodyRow;
