const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if(opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }

    return `rgb(var(${variableName}))`;
  };
};

const v = (name) => {
  return `var(--${name})`;
};

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        accent: v('accent'),
        'accent-hover': v('accentHover'),
        primary: v('primary'),
        'primary-hover': v('primaryHover'),
        'main-text': v('mainText'),
        'secondary-text': v('secondaryText'),
        'player-download-progress': v('playerDownloadProgress'),
        'player-bar': v('playerBar'),
      },
      fontFamily: {
        yellowtail: ['Yellowtail', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
