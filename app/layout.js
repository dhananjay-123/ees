import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "AeroGradient | Eco-Navigation",
  description: "Health-optimized routing and environmental vitals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 font-sans">
        <Navbar />
        <main className="pt-16 h-screen">{children}</main>
      </body>
    </html>
  );
}