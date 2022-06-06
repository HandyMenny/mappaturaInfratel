import ExternalLink from "../utils/ExternalLink";
import React from "react";
import InternalLink from "../utils/InternalLink";
import Faq from "./Faq";

const Footer = () => {
  return (
    <footer className="text-center w-full bg-indigo-900 p-2">
      <p>
        Basato su {" "}
        <ExternalLink
          href="https://theedoran.github.io/mappatura2021"
          text="Mappatura Infratel 2021"
          className="!text-indigo-50 !text-base italic font-semibold"
        />{" "}  di{" "}
        <ExternalLink
          href="https://edoardo.ranghieri.com"
          text="TheEdoRan"
          className="!text-indigo-50 !text-base font-semibold"
        />{" "}
      </p>
      <div className="flex items-center justify-center gap-4">
          <Faq buttonText="FAQ"/>
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
