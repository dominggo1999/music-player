import tw, { styled } from 'twin.macro';

export const MessageContainer = styled.div`
  ${tw`
    w-full 
    flex
    flex-col 
    items-center 
    justify-center
    h-full
  `}
`;

export const WelcomeMessage = styled.p`
  ${tw`
    text-xl
    mb-1
    text-accent
  `}
`;

export const Instruction = styled.p`
  ${tw`
    text-sm
    mb-4
  `}
`;
