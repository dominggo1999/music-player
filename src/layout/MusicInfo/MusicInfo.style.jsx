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
  `}
`;

export const Artist = styled.div`
  ${tw`
    text-darker-text
    text-lg
    truncate
  `}
`;
