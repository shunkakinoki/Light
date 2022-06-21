export interface ColourTheme {
  fg: string;
  bg: string;
  gray: string;
  pink: string;
}

export const defaultTheme = "Dark";

export const colourThemes: Record<string, ColourTheme> = {
  light: {
    fg: "#131126",
    bg: "#ffffff",
    gray: "dimgray",
    pink: "#C049FF",
  },
  dark: {
    fg: "#ffffff",
    bg: "#100f13",
    gray: "#808080",
    pink: "#C049FF",
  },
};
