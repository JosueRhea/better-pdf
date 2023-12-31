import { createTheme } from "@shopify/restyle";

const theme = createTheme({
  spacing: {
    s: 8,
    m: 16,
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
  },
  colors: {
    $background: "#FFFFFF",
    $foreground: "#09090B",
    $muted: "#F4F4F5",
    $mutedForeground: "#71717a",
    $popover: "#FFFFFF",
    $popoverForeground: "#09090B",
    $card: "#FFFFFF",
    $cardForeground: "#09090B",
    $border: "#E4E4E7",
    $input: "#E4E4E7",
    $primary: "#18181B",
    $primaryForeground: "#FAFAFA",
    $primaryForegroundAlpha: "#FAFAFA50",
    $secondary: "#F3F2F5",
    $secondaryAlpha: "#F3F2F530",
    $secondaryForeground: "#18181B",
    $accent: "#F4F4F5",
    $accentForeground: "#18181B",
    $destructive: "#EF4444",
    $destructiveForeground: "#FAFAFA",
    $ring: "#A1A1AA",
    $transparent: "#FFFFFF00",
  },
  borderRadii: {
    s: 8,
    xs: 6,
    xss: 2,
    full: 9999,
    lg: 8,
    xl: 12,
    "2xl": 16,
    "3xl": 24,
    "4xl": 36,
  },
  textVariants: {
    defaults: {
      lineHeight: 24,
      color: "$foreground",
    },
    buttonLabel: {
      fontSize: 16,
      color: "$primaryForeground",
      textAlign: "center",
    },
    heading: {
      fontSize: 24,
    },
  },
  buttonVariants: {
    defaults: {
      fontSize: 16,
      borderWidth: 1,
      borderRadius: "xs",
    },
    primary: {
      backgroundColor: "$primary",
      paddingHorizontal: "s",
      paddingVertical: "s",
      borderColor: "$primary",
    },
    secondary: {
      backgroundColor: "$secondary",
      borderColor: "$secondary",
      paddingHorizontal: "s",
      paddingVertical: "s",
    },
    ghost: {
      backgroundColor: "$transparent",
      borderColor: "$transparent",
    },
  },
});

type Theme = typeof theme;

export { theme, type Theme };