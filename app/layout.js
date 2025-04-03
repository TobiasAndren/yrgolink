import "./globals.css";
import { Footer } from "./components/footer.jsx";
import { TopNav } from "./components/top-nav/top-nav.jsx";
import { Main } from "./components/Main";

export const metadata = {
  title: "YrgoLink",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TopNav />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  );
}
