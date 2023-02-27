import type { Metadata } from "next";
// Styles
import "../public/styles/css/normalize.css";
import "../public/styles/sass/main.scss";
// Header Component
import Header from "../components/Header";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "World Explorer",
    description: "Explore the whole world in your home !",
    icons: {
        icon: "/favicon.png",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
