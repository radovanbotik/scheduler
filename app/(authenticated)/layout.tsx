// import type { Metadata } from "next";
// import "./globals.css";

import RLayout from "@/components/layout/RLayout";
import Container from "@/components/shared/Container";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <Container>
    <RLayout>{children}</RLayout>
    // </Container>
  );
}
