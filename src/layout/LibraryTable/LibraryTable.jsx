/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { TableWrapper } from './LibraryTable.style';
import useActiveSongStore from '../../store/useActiveSongStore';
import useListStore from '../../store/useListStore';

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

const LibraryTable = ({ playlist, sortingSettings, query }) => {
  const updateActiveSong = useActiveSongStore((state) => state.updateActiveSong);
  const updateSortedList = useListStore((state) => state.updateSortedList);

  const { send } = window.api;
  const [firstRenderFinished, setFirstRenderFinished] = useState(false);
  const sort = useListStore((state) => state.sort);

  const formatSongs = playlist.map((item) => {
    return {
      ...item,
      duration: formatDuration(item.duration),
      artist: item.artist || 'Unknown',
      genre: item.genre ? item.genre[0] : '',
    };
  });
  const memoizedSongs = useMemo(() => formatSongs, [JSON.stringify(playlist)]);

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
      initialState: {
        sortBy: [sortingSettings],
      },
    },
    useSortBy,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    sortedRows,
  } = reactTable;

  useEffect(() => {
    // Only change sorting settings when there is no query

    if(firstRenderFinished && !query) {
      send('save-sorting-settings', state.sortBy);
      sort(state.sortBy[0] || {});

      // Save order
      const newOrder = sortedRows.map((i) => i.id);
      send('save-sorted-index', newOrder);
      updateSortedList(newOrder);

      // Change global order state
    }
  }, [JSON.stringify(state.sortBy)]);

  useEffect(() => {
    setFirstRenderFinished(true);
  }, []);

  const play = (path) => {
    updateActiveSong(path);
    send('save-active-song', path);
  };

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
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
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
              const filePath = row.original.path;
              prepareRow(row);
              return (
                <tr
                  onDoubleClick={() => play(filePath)}
                  {...row.getRowProps()}
                >
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
