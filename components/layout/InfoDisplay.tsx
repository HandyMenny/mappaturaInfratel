import { useEffect, useRef } from "react";

import { EgonData } from "../../interfaces/egon";
import ExternalLink from "../utils/ExternalLink";

type Props = {
  data: EgonData;
};

const colorMapping: {
  [key: string]: { text: string; className: string };
} = {
  "": {
    text: "bianco",
    className: "bg-white text-black border-black",
  },
  n: {
    text: "nero",
    className: "bg-black border-white",
  },
  g: {
    text: "grigio",
    className: "bg-gray-500 border-whtie",
  },
};

const peakSpeedMapping: { [key: number]: string } = {
  30: "30-99 Mbit/s",
  100: "100-199 Mbit/s",
  200: "200-299 Mbit/s",
  300: "300-1000 Mbit/s",
  1000: "> 1000 Mbit/s",
};

const below300MbpsMapping: { [key: number]: string } = {
  0: "< 30 Mbit/s",
  1: "< 300 Mbit/s",
  2: ">= 300 Mbit/s",
};

const SectionTitle = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className="text-2xl sm:text-3xl text-indigo-100 uppercase">
      {text} {children}
    </h2>
  );
};

const SectionContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-5 items-center">{children}</div>;
};

const InfoDisplay = ({ data }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={divRef} className="flex flex-col items-center gap-10">
      <SectionContainer>
        <SectionTitle text="Colore del civico">
          <span className="text-white font-medium">{data.number}</span>
        </SectionTitle>
        <div className="text-center">
          <div
            className={`text-4xl sm:text-5xl py-3 px-4 border-2 ${
              colorMapping[data.color].className
            }`}
          >
            {colorMapping[data.color].text.toUpperCase()}
          </div>
          <ExternalLink
            href="https://fibra.click/aree-nere-grigie-bianche/"
            text="Maggiori informazioni sui colori"
          />
        </div>
      </SectionContainer>
      {!!data.peakSpeed && (
        <SectionContainer>
          <SectionTitle text="Velocità di picco" />
          <pre className="text-3xl sm:text-5xl">
            {peakSpeedMapping[data.peakSpeed]}
          </pre>
        </SectionContainer>
      )}
      <SectionContainer>
        <SectionTitle text="Velocità massima" />
        <pre className="text-3xl sm:text-5xl">
          {below300MbpsMapping[data.below300Mbps]}
        </pre>
      </SectionContainer>
    </div>
  );
};

export default InfoDisplay;
