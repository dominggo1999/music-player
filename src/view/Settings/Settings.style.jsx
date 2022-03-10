import tw, { styled } from 'twin.macro';

export const SettingsWrapper = styled.div`
  ${tw`
    w-full
    h-full 
    flex 
  `}
`;

export const OptionsArea = styled.div`
  ${tw`
    flex 
    flex-col 
    w-1/2
    gap-y-2
  `}
`;

export const Option = styled.div`
  ${tw`
    flex 
    justify-between 
    items-center
  `}
`;

export const OptionLabel = styled.span`
  ${tw`
    
  `}
`;
