/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { TableWrapper } from './LibraryTable.style';

const formatDuration = (secs) => {
  const secNum = parseInt(secs, 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

const parseDuration = (str) => {
  const p = str.toString().split(':');
  let s = 0;
  let m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
};

const sortDuration = (rowA, rowB, id, desc) => {
  const a = rowA.values[id];
  const b = rowB.values[id];
  const durationA = parseDuration(a);
  const durationB = parseDuration(b);

  if (durationA > durationB) return 1;
  if (durationB > durationA) return -1;
  return 0;
};

const LibraryTable = ({ songs }) => {
  const formatSongs = songs.map((item) => {
    return {
      ...item,
      duration: formatDuration(item.duration),
      artist: item.artist || 'Unknown',
      genre: item.genre ? item.genre[0] : '',
    };
  });
  const memoizedSongs = useMemo(() => formatSongs, [JSON.stringify(songs)]);

  const columns = useMemo(() => {
    return [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Artist',
        accessor: 'artist',
      },
      {
        Header: 'Duration',
        accessor: 'duration',
        sortType: sortDuration,
      },
      {
        Header: 'Genre',
        accessor: 'genre',
      },
    ];
  }, []);

  const reactTable = useTable(
    {
      columns,
      data: memoizedSongs,
    },
    useSortBy,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = reactTable;

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th>No</th>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  <td>{i + 1}</td>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}><span>{cell.render('Cell')}</span></td>
                    );
                  })}
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default LibraryTable;
