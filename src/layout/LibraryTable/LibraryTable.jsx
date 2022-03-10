/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { TableWrapper } from './LibraryTable.style';
import useListStore from '../../store/useListStore';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const sortDuration = (rowA, rowB, id, desc) => {
  const durationA = rowA.original.duration;
  const durationB = rowB.original.duration;

  if (durationA > durationB) return 1;
  if (durationB > durationA) return -1;
  return 0;
};

const LibraryTable = ({ playlist, sortingSettings, query }) => {
  const updateOrder = useListStore((state) => state.updateOrder);

  const { send } = window.api;
  const [firstRenderFinished, setFirstRenderFinished] = useState(false);
  const sort = useListStore((state) => state.sort);

  const formatSongs = playlist.map((item) => {
    return {
      ...item,
      artist: item.artist || 'Unknown',
      genre: item.genre.length > 0 ? item.genre[0] : '',
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
        accessor: 'formattedDuration',
        sortType: sortDuration,
      },
      {
        Header: 'Genre',
        accessor: 'genre',
      },
    ];
  }, []);

  sortingSettings = sortingSettings.id ? [sortingSettings] : [];

  const reactTable = useTable(
    {
      columns,
      data: memoizedSongs,
      initialState: {
        sortBy: sortingSettings,
      },
    },
    useSortBy,
  );

  const {
    getTableProps,
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

      const playlistOrdered = sortedRows.map((i) => i.original);

      // Update "order" global state
      updateOrder(playlistOrdered.map((i) => i.path));
    }
  }, [JSON.stringify(state.sortBy)]);

  useEffect(() => {
    const playlistOrdered = sortedRows.map((i) => i.original);
    updateOrder(playlistOrdered.map((i) => i.path));

    setFirstRenderFinished(true);
  }, []);

  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          rows={rows}
          getTableBodyProps={getTableProps}
          prepareRow={prepareRow}
        />
      </table>
    </TableWrapper>
  );
};

export default LibraryTable;
