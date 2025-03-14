import localFont from "next/font/local";

export const firago = localFont({
  src: [
    {
      path: "./FiraGO-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./FiraGO-Book.woff2",
      weight: "350",
      style: "normal",
    },
    {
      path: "./FiraGO-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./FiraGO-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./FiraGO-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./FiraGO-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-firago",
});
