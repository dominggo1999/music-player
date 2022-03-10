import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  body {
    ${tw`
      antialiased
      bg-primary
    `}    
  }

  @font-face {
    font-family: 'Yellowtail';
    src: url('/Yellowtail.woff2') format('woff2'),
        url('/Yellowtail.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
