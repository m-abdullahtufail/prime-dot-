import localFont from "next/font/local";

export const archivoExpanded = localFont({
  src: [
    {
      path: "../font/Archivo_Expanded-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/Archivo_Expanded-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font/Archivo_Expanded-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/Archivo_Expanded-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/Archivo_Expanded-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../font/Archivo_Expanded-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-archivo-expanded",
  display: "swap",
});

export const urbanist = localFont({
  src: "../font/Urbanist[wght].ttf",
  weight: "100 900",
  variable: "--font-urbanist",
  display: "swap",
});
