import tw, { styled } from 'twin.macro';

export const ControlButton = styled.button`
  ${tw`
    text-2xl
    flex 
    items-center 
    justify-center
    w-full 
    h-full
    text-accent
  `}
`;

export const TableWrapper = styled.div`
  ${tw`
    flex
    flex-col 
    flex-1
    select-none
  `}

  table {
    ${tw`
      flex 
      flex-col 
      flex-1
    `}
  }

  thead {
    ${tw`
      pr-[5px]
    `}
  }

  tbody{
    ${tw`
      flex
      flex-col
      flex-1 
      overflow-y-auto
    `}
  flex-basis : 0;
  }

  thead tr th {
    ${tw`
      text-left 
      text-lg
      text-accent
      font-normal
      py-2
      flex
      items-center
    `}

    span {
      ${tw`
        text-2xl
        pl-[1px]
      `}
    }
  }

  tr{
    ${tw`
      flex
      w-full
      px-5
    `}
  }

  tbody tr {
    ${ControlButton}{
      ${tw`
        hidden
      `}
    }
    

    &:hover{
      ${ControlButton}{
        ${tw`
          block
        `}
      }

      .equalizer-icon{
        ${tw`
          hidden
        `}
      }

      td:nth-of-type(1) span {
        ${tw`
          hidden
        `}
      }
    }
  }

  /* If song is playing */
  tr.now-playing{
    ${tw`
      text-accent
      font-semibold
    `}
  }

  td{
    ${tw`
      flex
      items-center
    `}
    span{
      ${tw`
        max-w-[90%]
        truncate 
        inline-block
      `}
    }
  }

  th:nth-of-type(1),
  td:nth-of-type(1){
    ${tw`
      w-[5%]
    `}
  }

  th:nth-of-type(2),
  td:nth-of-type(2){
    ${tw`
      w-[45%]
    `}
  }

  th:nth-of-type(3),
  td:nth-of-type(3){
    ${tw`
      w-[20%]
    `}
  }

  th:nth-of-type(4),
  td:nth-of-type(4){
    ${tw`
      w-[15%]
    `}
  }

  th:nth-of-type(5),
  td:nth-of-type(5){
    ${tw`
      w-[15%]
    `}
  }

  tbody tr {
    ${tw`
      py-3 
      hover:bg-primary-hover
    `}

    ${({ bg }) => bg && tw`hover:(bg-transparent)`}
  }

  tbody::-webkit-scrollbar {
  ${tw`
      bg-primary
    `}
  }

  tbody::-webkit-scrollbar-track {
    ${tw`
      bg-transparent
    `}
  }

  tbody::-webkit-scrollbar {
    ${tw`
      w-[8px]
      bg-transparent
    `}
  }

  tbody::-webkit-scrollbar-thumb {
    ${tw`
      rounded-full
      w-[8px]
      bg-transparent
    `}
  }

  table:hover tbody::-webkit-scrollbar-thumb{
  ${tw`
      bg-accent
    `}
  }
`;
