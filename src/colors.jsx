const colorThemes = {
  light: {
    background: ["#ffffff", "#f5f5f5", "#e0e0e0", "#d3d3d3"],
    text: ["#000000", "#333333", "#666666", "#999999"],
  },
  dark: {
    background: ["#171717", "#212121", "#555555", "#666666"],
    text: ["#ffffff", "#f0f0f0", "#cccccc", "#999999"],
  },
};

const getColors = (isDarkMode) => {
  const theme = isDarkMode ? colorThemes.dark : colorThemes.light;
  const [bgMain, bgSecondary, bgElevated, bgBorder] = theme.background;
  const [textPrimary, textSecondary, textTertiary, textQuaternary] = theme.text;

  return {
    // Background colors
    bgMain,
    bgSecondary,
    bgElevated,
    bgBorder,

    // Text colors
    textPrimary,
    textSecondary,
    textTertiary,
    textQuaternary,
  };
};

const colors = getColors(false); // Assuming initial mode is light
export const {
  bgPrimary,
  bgSecondary,
  bgTertiary,
  bgBorder,
  textPrimary,
  textSecondary,
  textTertiary,
  textQuaternary,
} = colors;

export default getColors;
