import tw, { styled } from 'twin.macro';

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
    `}
  }

  tr{
    ${tw`
      flex
      w-full
      px-5
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
      hover:bg-[#272b61]
    `}
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
