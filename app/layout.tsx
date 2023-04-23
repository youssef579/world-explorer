// Styles
import "@/css/normalize.css";
import "@/sass/main.scss";
// Header Component
import Header from "@/components/Header";
import { Roboto } from "next/font/google";
// Vercel analysis
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata = {
    title: "World Explorer",
    description: "Explore the whole world in your home !",
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
                <Analytics />
            </body>
        </html>
    );
}
