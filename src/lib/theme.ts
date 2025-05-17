import { createTheme, Palette, PaletteOptions } from "@mui/material/styles";
import {
  purple,
  pink,
  blue,
  yellow,
  orange,
  green,
  cyan,
  red,
  teal,
  grey,
} from "@mui/material/colors";

// Extend custom colors
declare module "@mui/material/styles" {
  interface Palette {
    customPink: Palette["primary"];
    customPurple: Palette["primary"];
    customBlue: Palette["primary"];
    customYellow: Palette["primary"];
    chipError: Palette["primary"];
    chipSuccess: Palette["primary"];
    chipWarning: Palette["primary"];
    chipInfo: Palette["primary"];
  }
  interface PaletteOptions {
    customPink?: PaletteOptions["primary"];
    customPurple?: PaletteOptions["primary"];
    customBlue?: PaletteOptions["primary"];
    customYellow?: PaletteOptions["primary"];
    chipError?: PaletteOptions["primary"];
    chipSuccess?: PaletteOptions["primary"];
    chipWarning?: PaletteOptions["primary"];
    chipInfo?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: teal.A700,
          contrastText: "#ffffff",
        },
        success: {
          main: green[100],
          contrastText: green[500],
        },
        error: {
          main: red[100],
          contrastText: red[500],
        },
        warning: {
          main: blue[50],
          contrastText: blue[700],
        },
        info: {
          main: "#2196f3",
          contrastText: "#0d47a1",
        },
        customPink: {
          main: pink[100],
          contrastText: "#000000",
        },
        customPurple: {
          main: purple[100],
          contrastText: "#000000",
        },
        customBlue: {
          main: blue[100],
          contrastText: "#000000",
        },
        customYellow: {
          main: yellow[100],
          contrastText: "#000000",
        },
        chipError: {
          main: red[100],
          contrastText: red[900],
        },
        chipSuccess: {
          main: green[100],
          contrastText: green[900],
        },
        chipWarning: {
          main: yellow[200],
          contrastText: yellow[900],
        },
        chipInfo: {
          main: cyan[500],
          contrastText: "#ffffff",
        },
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
        },
        text: {
          primary: "#000000",
          secondary: "#555555",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: teal.A100,
          contrastText: "#ffffff",
        },
        success: {
          main: green[500],
          contrastText: green[50],
        },
        error: {
          main: red[500],
          contrastText: red[50],
        },
        warning: {
          main: blue[500],
          contrastText: "#ffffff",
        },
        info: {
          main: "#1976d2",
          contrastText: "#ffffff",
        },
        customPink: {
          main: pink[400],
          contrastText: "#ffffff",
        },
        customPurple: {
          main: purple[300],
          contrastText: "#ffffff",
        },
        customBlue: {
          main: blue[400],
          contrastText: "#ffffff",
        },
        customYellow: {
          main: yellow[400],
          contrastText: "#ffffff",
        },
        chipError: {
          main: red[500], // Lighter blue for error Chip
          contrastText: red[50],
        },
        chipSuccess: {
          main: green[500], // Lighter green for success Chip
          contrastText: green[50],
        },
        chipWarning: {
          main: yellow[700], // Lighter orange for warning Chip
          contrastText: yellow[50],
        },
        chipInfo: {
          main: cyan[300], // Lighter cyan for info Chip
          contrastText: "#ffffff",
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cccccc",
        },
      },
    },
  },
});
