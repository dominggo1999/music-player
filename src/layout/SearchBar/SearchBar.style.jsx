import tw, { styled } from 'twin.macro';

export const StyledSearchBar = styled.div`
   input {
    ${tw`
      bg-transparent
      border
      border-2
      rounded-full
      px-5
      py-1
      outline-none
    `}
  }
`;
