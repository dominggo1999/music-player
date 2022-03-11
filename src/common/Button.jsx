import tw, { styled } from 'twin.macro';

export const Button = styled.button`
  ${tw`
    bg-accent 
    hover:bg-accent-hover
    text-primary
    px-4 
    py-1  
    rounded-full
    font-medium
  `}
`;
