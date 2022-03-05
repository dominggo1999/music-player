import tw, { styled } from 'twin.macro';

export const HeaderWrapper = styled.nav`
  ${tw`
    py-2
    flex
    justify-between
    items-center
  `}
`;

export const Brand = styled.div`
  ${tw`
    font-semibold
    text-3xl
    text-accent
  `}
`;

export const Icons = styled.div`
  ${tw`
    flex
    items-center
    h-full
    gap-x-10
  `}

  .link-active{
    ${tw`
      text-accent
    `}
  }
`;

export const IconItem = styled.div`
  ${tw`
    text-2xl
    h-full
  `}
`;
