import ExternalLink from "../utils/ExternalLink";
import React from "react";
import InternalLink from "../utils/InternalLink";
import Faq from "./Faq";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full bg-indigo-900 py-2">
      <p>
        Basato su {" "}
        <ExternalLink
          href="https://theedoran.github.io/mappatura2021"
          text="Mappatura Infratel 2021"
          className="text-white !text-base italic font-semibold hover:no-underline"
        />{" "}  di{" "}
        <ExternalLink
          href="https://edoardo.ranghieri.com"
          text="TheEdoRan"
          className="text-white !text-base font-semibold hover:no-underline"
        />{" "}
      </p>
      <div className="flex items-center justify-center gap-4">
          <Faq/>
        <p>
          <ExternalLink
            href="https://github.com/HandyMenny/mappaturaInfratel"
            text="Codice Sorgente"
          />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
