import tw, { styled } from 'twin.macro';

export const MusicInfoWrapper = styled.div`
  ${tw`
    text-center
    absolute
    w-full
    bottom-0
  `}
`;

export const Title = styled.div`
  ${tw`
    text-xl
    truncate
    max-w-[80%] 
    mx-auto
  `}
`;

export const Artist = styled.div`
  ${tw`
    text-secondary-text
    text-lg
    truncate
  `}
`;
