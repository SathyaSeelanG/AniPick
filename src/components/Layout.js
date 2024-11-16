import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, title = "AniPick | Anime Recommendations" }) => {
  return (
    <>
      <Head>
        <title>{title}</title> {/* Dynamically set the title */}
        <link rel="icon" href="https://raw.githubusercontent.com/SathyaSeelanG/assets/refs/heads/main/Projects/AniPick/AniPick_logo.png" /> {/* Same favicon for all pages */}
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
