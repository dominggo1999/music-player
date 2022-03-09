import tw, { styled } from 'twin.macro';

export const LibraryWrapper = styled.div`
  ${tw`
    flex 
    flex-col 
    flex-1
  `}
`;

export const TopSection = styled.div`
  ${tw`
    flex
    bg-primary
    pb-2
    justify-between
  `}

  button {
    ${tw`
      font-semibold
    `}
  }
`;

export const LoadingIndicatorWrapper = styled.div`
  ${tw`
    flex 
    flex-col 
    flex-1
    justify-center 
    items-center
  `}
`;

export const LoadingText = styled.span`
  ${tw`
    mt-4 
    text-light-text
  `}
`;
