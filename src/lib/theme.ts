// // theme.ts
// import { createTheme } from "@mui/material/styles";
// import { alpha } from "@mui/material";

// export const theme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: "data-toolpad-color-scheme",
//   },
//   colorSchemes: {
//     light: {
//       palette: {
//         mode: "light",
//         primary: { main: "#6200ea" },
//         success: {
//           main: "#4caf50",
//           contrastText: "#1b5e20", // dark green text
//         },
//         error: {
//           main: "#f44336",
//           contrastText: "#b71c1c", // dark red text
//         },
//         warning: {
//           main: "#ff9800",
//           contrastText: "#e65100", // deep orange
//         },
//         info: {
//           main: "#2196f3",
//           contrastText: "#0d47a1", // dark blue
//         },
//         background: {
//           default: "#f5f5f5",
//           paper: "#ffffff",
//         },
//         text: {
//           primary: "#000000",
//           secondary: "#555555",
//         },
//       },
//       components: {
//         MuiChip: {
//           styleOverrides: {
//             root: ({ ownerState, theme }) => ({
//               ...(ownerState.color === "success" && {
//                 backgroundColor: alpha(theme.palette.success.main, 0.15),
//                 color: theme.palette.success.contrastText,
//               }),
//               ...(ownerState.color === "error" && {
//                 backgroundColor: alpha(theme.palette.error.main, 0.15),
//                 color: theme.palette.error.contrastText,
//               }),
//               ...(ownerState.color === "warning" && {
//                 backgroundColor: alpha(theme.palette.warning.main, 0.15),
//                 color: theme.palette.warning.contrastText,
//               }),
//               ...(ownerState.color === "info" && {
//                 backgroundColor: alpha(theme.palette.info.main, 0.15),
//                 color: theme.palette.info.contrastText,
//               }),
//             }),
//           },
//         },
//       },
//     },
//     dark: {
//       palette: {
//         mode: "dark",
//         primary: { main: "#bb86fc" },
//         success: {
//           main: "#388e3c", // deeper green
//           contrastText: "#ffffff", // light text
//         },
//         error: {
//           main: "#d32f2f",
//           contrastText: "#ffffff",
//         },
//         warning: {
//           main: "#f57c00",
//           contrastText: "#ffffff",
//         },
//         info: {
//           main: "#1976d2",
//           contrastText: "#ffffff",
//         },
//         background: {
//           default: "#121212",
//           paper: "#1e1e1e",
//         },
//         text: {
//           primary: "#ffffff",
//           secondary: "#cccccc",
//         },
//       },
//       components: {
//         MuiChip: {
//           styleOverrides: {
//             root: ({ ownerState, theme }) => ({
//               ...(ownerState.color === "success" && {
//                 backgroundColor: alpha(theme.palette.success.main, 0.8),
//                 color: theme.palette.success.contrastText,
//               }),
//               ...(ownerState.color === "error" && {
//                 backgroundColor: alpha(theme.palette.error.main, 0.8),
//                 color: theme.palette.error.contrastText,
//               }),
//               ...(ownerState.color === "warning" && {
//                 backgroundColor: alpha(theme.palette.warning.main, 0.8),
//                 color: theme.palette.warning.contrastText,
//               }),
//               ...(ownerState.color === "info" && {
//                 backgroundColor: alpha(theme.palette.info.main, 0.8),
//                 color: theme.palette.info.contrastText,
//               }),
//             }),
//           },
//         },
//       },
//     },
//   },
// });

import { createTheme, Palette, PaletteOptions } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { purple, pink, blue, yellow } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    customPink: Palette["primary"];
    customPurple: Palette["primary"];
    customBlue: Palette["primary"];
    customYellow: Palette["primary"];
  }
  interface PaletteOptions {
    customPurple?: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    customPink?: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    customBlue?: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    customYellow?: PaletteOptions["primary"];
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
        primary: { main: purple[500] }, // Default primary color
        success: {
          main: purple[50], // Light purple for success background
          contrastText: purple[500], // Darker purple for text
        },
        error: {
          main: pink[50], // Light pink for error background
          contrastText: pink[500], // Darker pink for text
        },
        warning: {
          main: blue[50], // Light blue for warning background
          contrastText: blue[500], // Darker blue for text
        },
        info: {
          main: "#2196f3",
          contrastText: "#0d47a1", // Default info colors
        },
        customPink: {
          main: pink[400],
          contrastText: pink[700],
        },
        customPurple: {
          main: purple[400],
          contrastText: purple[700],
        },
        customBlue: {
          main: blue[400],
          contrastText: blue[500],
        },
        customYellow: {
          main: yellow[400],
          contrastText: blue[500],
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
      components: {
        MuiChip: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              ...(ownerState.color === "success" && {
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
              }),
              ...(ownerState.color === "error" && {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
              }),
              ...(ownerState.color === "warning" && {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
              }),
              ...(ownerState.color === "info" && {
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
              }),
            }),
          },
        },
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              ...(ownerState.color === "success" && {
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.success.main, 0.8),
                },
              }),
              ...(ownerState.color === "error" && {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.8),
                },
              }),
              ...(ownerState.color === "warning" && {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.warning.main, 0.8),
                },
              }),
              ...(ownerState.color === "info" && {
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.info.main, 0.8),
                },
              }),
            }),
          },
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: { main: purple[200] }, // Lighter primary for dark mode
        success: {
          main: purple[500], // Darker purple for success background
          contrastText: purple[50], // Light purple for text
        },
        error: {
          main: pink[500], // Darker pink for error background
          contrastText: pink[50], // Light pink for text
        },
        warning: {
          main: blue[500], // Darker blue for warning background
          contrastText: blue[50], // Light blue for text
        },
        info: {
          main: "#1976d2",
          contrastText: "#bbdefb", // Lighter blue for info text
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
      components: {
        MuiChip: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              ...(ownerState.color === "success" && {
                backgroundColor: alpha(theme.palette.success.main, 0.3), // Lower alpha for dark mode
                color: theme.palette.success.contrastText,
              }),
              ...(ownerState.color === "error" && {
                backgroundColor: alpha(theme.palette.error.main, 0.3),
                color: theme.palette.error.contrastText,
              }),
              ...(ownerState.color === "warning" && {
                backgroundColor: alpha(theme.palette.warning.main, 0.3),
                color: theme.palette.warning.contrastText,
              }),
              ...(ownerState.color === "info" && {
                backgroundColor: alpha(theme.palette.info.main, 0.3),
                color: theme.palette.info.contrastText,
              }),
            }),
          },
        },
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState, theme }) => ({
              ...(ownerState.color === "success" && {
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.success.main, 0.9),
                },
              }),
              ...(ownerState.color === "error" && {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.error.main, 0.9),
                },
              }),
              ...(ownerState.color === "warning" && {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.warning.main, 0.9),
                },
              }),
              ...(ownerState.color === "info" && {
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.info.main, 0.9),
                },
              }),
            }),
          },
        },
      },
    },
  },
});
