import tw, { styled } from 'twin.macro';

export const StyledSearchBar = styled.div`
  ${tw`
      relative
  `}

   input {
    ${tw`
      bg-transparent
      border
      border-2
      rounded-full
      pl-5
      pr-10
      py-1
      outline-none
    `}
  }
`;

export const ClearQueryButton = styled.button`
  ${tw`
    w-[40px]
    h-full
    absolute 
    right-0
    flex
    items-center 
    justify-center 
  `}

  &:hover svg{
    ${tw`
      opacity-100
    `}
  }

  svg{
    ${tw`
      opacity-80
    `}
  }
`;
