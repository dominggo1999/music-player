import { themes } from './themes';

const createStyle = () => {
  let styles = '';

  themes.forEach((i) => {
    const {
      primary,
      secondary,
      mainBackground,
      accent,
      accentLighter,
      lightText,
    } = i.colors;

    const attributes = `
    --primary : ${primary};
    --secondary : ${secondary};
    --main-background : ${mainBackground};
    --accent : ${accent};
    --accent-lighter : ${accentLighter};
    --light-text : ${lightText};
    `;

    styles += `
      .${i.name} {
        ${attributes}
      }
    `;
  });

  return styles;
};

export default createStyle;
