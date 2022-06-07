import Head from "next/head";
import { SearchContextProvider } from "../context/SearchContext";

import Footer from "../components/layout/Footer";
import SearchContainer from "../components/layout/SearchContainer";
import ExternalLink from "../components/utils/ExternalLink";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Esiti Mappatura Infratel | Ricerca il tuo civico
        </title>
        <meta
          name="description"
          content="Scopri le informazioni riguardanti la copertura in fibra ottica prevista entro il 2026 al tuo indirizzo."
        />
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <main className="flex flex-1 flex-col p-5 justify-center items-center w-full">
        <h1 className="text-2xl sm:text-4xl font-medium mb-1 drop-shadow-lg">
          Mappatura Infratel 2017-2021
        </h1>
        <h2 className="sm:text-lg italic font-light text-blue-300 drop-shadow-lg mb-7">
          Copertura prevista entro il 2026 in Italia
        </h2>
        <SearchContextProvider>
          <SearchContainer />
        </SearchContextProvider>
      </main>
      <Footer />
    </>
  );
}
