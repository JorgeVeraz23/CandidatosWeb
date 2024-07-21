/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
 * The base colors for the Soft UI Dashboard PRO React.
 * You can add new color using this file.
 * You can customized the colors for the entire Soft UI Dashboard PRO React using thie file.
 */
const primary = "#fbb03b";
const primaryContainer = "#ffddb4";
const secondary = "#705b40";
const tertiary = "#0071bc";
const error = "#ba1a1a";
const outline = "#b3b3b3";
const background = "#fffbff";
const success = "#2D9596";
const warning = "#FE7A36";

const gradientColors = {
  primary: {
    main: "#f17400",
    state: "#fbb13b",
    border: "#fedeac"
  },

  secondary: {
    main: "#03519a",
    state: "#7ed0fb",
    border: "#b2e3fd",
  },
}

const colors = {
  background: {
    default: background,
  },

  text: {
    main: "#67748e",
    focus: "#67748e",
  },

  transparent: {
    main: "transparent",
  },

  white: {
    main: "#ffffff",
    focus: "#ffffff",
  },

  black: {
    light: "#141414",
    main: "#000000",
    focus: "#000000",
  },

  primary: {
    main: primary,
    focus: "#EF9F21",
    container: primaryContainer
  },

  secondary: {
    main: secondary,
    focus: "#634B2D",
  },

  info: {
    main: tertiary,
    focus: "#025B95",
  },

  error: {
    main: error,
    focus: "#AD0909",
  },

  outline: {
    main: outline,
    focus: "#655E6C"
  },

  success: {
    main: success,
    focus: "#1B8182",
  },

  warning: {
    main: warning,
    focus: "#F2661E",
  },

  light: {
    main: "#e9ecef",
    focus: "#e9ecef",
  },

  dark: {
    main: "#344767",
    focus: "#344767",
  },

  grey: {
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  
  gradients: {
    ...gradientColors,
    // primary: {
    //   main: "#f68400",
    //   state: "#fedeac",
    // },

    // secondary: {
    //   main: "#03519a",
    //   state: "#7ed0fb",
    // },

    info: {
      main: "#2152ff",
      state: "#21d4fd",
    },

    success: {
      main: "#17ad37",
      state: "#98ec2d",
    },

    warning: {
      main: "#f53939",
      state: "#fbcf33",
    },

    error: {
      main: "#ea0606",
      state: "#ff667c",
    },

    light: {
      main: "#ced4da",
      state: "#ebeff4",
    },

    dark: {
      main: "#141727",
      state: "#3a416f",
    },
  },

  socialMediaColors: {
    facebook: {
      main: "#3b5998",
      dark: "#344e86",
    },

    twitter: {
      main: "#55acee",
      dark: "#3ea1ec",
    },

    instagram: {
      main: "#125688",
      dark: "#0e456d",
    },

    linkedin: {
      main: "#0077b5",
      dark: "#00669c",
    },

    pinterest: {
      main: "#cc2127",
      dark: "#b21d22",
    },

    youtube: {
      main: "#e52d27",
      dark: "#d41f1a",
    },

    vimeo: {
      main: "#1ab7ea",
      dark: "#13a3d2",
    },

    slack: {
      main: "#3aaf85",
      dark: "#329874",
    },

    dribbble: {
      main: "#ea4c89",
      dark: "#e73177",
    },

    github: {
      main: "#24292e",
      dark: "#171a1d",
    },

    reddit: {
      main: "#ff4500",
      dark: "#e03d00",
    },

    tumblr: {
      main: "#35465c",
      dark: "#2a3749",
    },
  },

  alertColors: {
    primary: {
      main: gradientColors.primary.main,
      state: gradientColors.primary.state,
      border: gradientColors.primary.border,
    },

    secondary: {
      main: gradientColors.secondary.main,
      state: gradientColors.secondary.state,
      border: gradientColors.secondary.border,
    },

    info: {
      main: "#2152ff",
      state: "#02c6f3",
      border: "#b9ecf8",
    },

    success: {
      main: "#17ad37",
      state: "#84dc14",
      border: "#daf3b9",
    },

    warning: {
      main: "#f53939",
      state: "#fac60b",
      border: "#fef1c2",
    },

    error: {
      main: "#ea0606",
      state: "#ff3d59",
      border: "#f9b4b4",
    },

    light: {
      main: "#ced4da",
      state: "#d1dae6",
      border: "#f8f9fa",
    },

    dark: {
      main: "#141727",
      state: "#2c3154",
      border: "#c2c8d1",
    },
  },

  badgeColors: {
    primary: {
      background: "#f883dd",
      text: "#a3017e",
    },

    secondary: {
      background: "#e4e8ed",
      text: "#5974a2",
    },

    info: {
      background: "#abe9f7",
      text: "#08a1c4",
    },

    success: {
      background: "#cdf59b",
      text: "#67b108",
    },

    warning: {
      background: "#fef5d3",
      text: "#fbc400",
    },

    error: {
      background: "#fc9797",
      text: "#bd0000",
    },

    light: {
      background: "#ffffff",
      text: "#c7d3de",
    },

    dark: {
      background: "#8097bf",
      text: "#1e2e4a",
    },
  },

  inputColors: {
    borderColor: { main: outline, focus: primary },
    boxShadow: primary,
    error: error,
    success: success,
  },

  sliderColors: {
    thumb: { borderColor: "#d9d9d9" },
  },

  circleSliderColors: {
    background: "#d3d3d3",
  },

  tabs: {
    indicator: { boxShadow: "#ddd" },
  },
};

export default colors;
