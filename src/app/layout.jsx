import { Analytics } from "@vercel/analytics/next"
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
      <Analytics/>
    </html>
  );
}
