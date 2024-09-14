import { useEffect, useRef } from "react";

import { EgonData } from "../../interfaces/egon";
import ExternalLink from "../utils/ExternalLink";
import Faq from "./Faq";

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
    className: "bg-black text-indigo-100 border-white",
  },
  g: {
    text: "grigio",
    className: "bg-gray-500 text-indigo-100 border-whtie",
  },
};

// Peak/Max speed consultazione 2021 grigie-nere
const peakSpeedMapping: { [key: number]: string } = {
  0: "< 30 Mbit/s",
  1: "< 300 Mbit/s",
  2: ">= 300 Mbit/s",
  30: "30-99 Mbit/s",
  100: "100-199 Mbit/s",
  200: "200-299 Mbit/s",
  300: "300-999 Mbit/s",
  1000: ">= 1000 Mbit/s",
};

// Peak/Max speed consultazione 2021 bianche
const peakSpeedMappingB: { [key: number]: string } = {
  0: "< 300 Mbit/s",
  1: ">= 300 Mbit/s",
};

// PeakMax speed consultazione 2017-2019 bianche
const peakSpeedMapping2017: { [key: number]: string } = {
  0: "< 30 Mbit/s",
  30: "30-99 Mbit/s",
  100: ">= 100 Mbit/s"
};

const connettiMapping: { [key: number]: string } = {
  0: "",
  1: "Esistente",
  2: "Inesistente",
  3: "Escluso no UI",
  4: "Escluso residuale",
  5: "Escluso già coperto"
};

const p1gStatusMapping: { [key: number]: string } = {
  0: "No",
  1: "Sì",
  2: "Sì",
  3: "Potenziale civico di prossimità"
};

const p1gWinnerMapping: { [key: number]: string } = {
  1: "Operfiber",
  2: "Fibercop",
  3: "Openfiber"
}

const SectionTitle = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <summary className="text-2xl sm:text-3xl text-indigo-100 uppercase text-center">
      {text} {children}
    </summary>
  );
};

const SubSectionTitle = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <h2 className="text-xl sm:text-2xl text-indigo-200 uppercase text-center mt-3">
      {text} {children}
    </h2>
  );
};

const SectionContainer = ({ children, open }: { children: React.ReactNode, open?: boolean }) => {
  return <details className="flex flex-col items-center cursor-pointer" open={open}>{children}</details>;
};

const InfoDisplay = ({ data }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  let consultazione2021 = (
      <SectionContainer>
        <SectionTitle text="Consultazione 2021"/>
        <SubSectionTitle text="Non censito"/>
      </SectionContainer>
  )
  if (data.below300Mbps_2021 != null) {
    consultazione2021 = (
        <>
        <SectionContainer>
          <SectionTitle text="Consultazione 2021"/>
          {data.color_2021 != null && (
          <SubSectionTitle text="Colore civico 2026">
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl py-3 px-4 m-auto w-[calc(100%_-_2.9rem)] border-2 ${
                colorMapping[data.color_2021].className
              }`}>
                {colorMapping[data.color_2021].text.toUpperCase()}
              </div>
            </div>
          </SubSectionTitle>
          )}
          <SubSectionTitle text="Velocità massima 2026">
            <div>
            {data.color_2021 != null ? peakSpeedMapping[data.below300Mbps_2021] : peakSpeedMappingB[data.below300Mbps_2021]}
            </div>
          </SubSectionTitle>
          <SubSectionTitle text="Velocità ore di punta 2026">
            <div>
              {data.color_2021 != null ? peakSpeedMapping[data.peakSpeed_2021] : peakSpeedMappingB[data.peakSpeed_2021]}
            </div>
          </SubSectionTitle>
        </SectionContainer>
        </>
    )
  }

  let consultazione2020 = (
      <SectionContainer>
        <SectionTitle text="Consultazione 2020"/>
        <SubSectionTitle text="Non censito"/>
      </SectionContainer>
  )
  if(data.class19_2020 != null) {
    consultazione2020 = (
        <SectionContainer>
          <SectionTitle text="Consultazione 2020"/>
          <SubSectionTitle text="Copertura 2019">
            <div
                className={`text-2xl sm:text-3xl py-3 px-4 m-auto w-[calc(100%_-_2.9rem)] border-2 ${
                    colorMapping[data.class19_2020[0] || ''].className
                }`}
            >
            {colorMapping[data.class19_2020[0] || ''].text.toUpperCase()}{data.class19_2020[1] == 'v' ? ' VHCN' : (data.class19_2020[1] == 'n' || data.class19_2020[0] == 'n') ? ' NGA' : ''}{
              data.class19_2020[2] == 'r' ? ' RAME' : data.class19_2020[2] == 'w' ? ' FWA' : data.class19_2020[2] == 'f' ? ' FTTH' : ''}
          </div>
          </SubSectionTitle>
          <SubSectionTitle text="Copertura 2022">
            <div
                className={`text-2xl sm:text-3xl py-3 px-4 m-auto w-[calc(100%_-_2.9rem)] border-2 ${
                    colorMapping[data.class22_2020[0] || ''].className
                }`}
            >
              {colorMapping[data.class22_2020[0] || ''].text.toUpperCase()}{data.class22_2020[1] == 'v' ? ' VHCN' : (data.class22_2020[1] == 'n' || data.class22_2020[0] == 'n') ? ' NGA' : ''}{
              data.class22_2020[2] == 'r' ? ' RAME' : data.class22_2020[2] == 'w' ? ' FWA' : data.class22_2020[2] == 'f' ? ' FTTH' : ''}
            </div>
          </SubSectionTitle>
        </SectionContainer>
    )
  }

  let consultazione2019 = (
      <SectionContainer>
        <SectionTitle text="Consultazione 2019"/>
        <SubSectionTitle text="Non censito"/>
      </SectionContainer>
  )
  if(data.cat18_2019 != null) {
    consultazione2019 = (
        <SectionContainer>
          <SectionTitle text="Consultazione 2019"/>
          <SubSectionTitle text="Velocità massima 2018">
            <div>
              {peakSpeedMapping2017[data.cat18_2019]}
            </div>
          </SubSectionTitle>
          <SubSectionTitle text="Velocità massima 2021">
            <div>
              {peakSpeedMapping2017[data.cat21_2019]}
            </div>
          </SubSectionTitle>
        </SectionContainer>
    )
  }

  let consultazione2017 = (
      <SectionContainer>
        <SectionTitle text="Consultazione 2017"/>
        <SubSectionTitle text="Non censito"/>
      </SectionContainer>
  )
  if(data.speed20_2017 != null) {
    consultazione2017 = (
        <SectionContainer>
          <SectionTitle text="Consultazione 2017" />
          <SubSectionTitle text="Velocità massima 2020">
            <div>
              {peakSpeedMapping2017[data.speed20_2017]}
            </div>
          </SubSectionTitle>
        </SectionContainer>
    )
  }

  let italia1Giga = (<SectionContainer open={true}>
    <SectionTitle text="Piano Italia 1 Giga" />
    <SubSectionTitle text="Incluso nel bando">
      <div>
        {p1gStatusMapping[data.status_p1g]}
      </div>
    </SubSectionTitle>
    {!!data.status_p1g && (
      <SubSectionTitle text="Vincitore Bando">
        <div>
          {p1gWinnerMapping[data.status_p1g]}
        </div>
      </SubSectionTitle>
    )}
    {!!data.status_p1g && !!data.walkin_connetti && (
      <SubSectionTitle text="Esito Walk in">
        <div>
          {connettiMapping[data.walkin_connetti]}
        </div>
      </SubSectionTitle>
    )}
  </SectionContainer>);

  return (
    <div ref={divRef} className="flex flex-col items-center justify-evenly gap-8">
      {italia1Giga}
      {consultazione2021}
      {consultazione2020}
      {consultazione2019}
      {consultazione2017}
      <div className="text-center w-full">
        <p>
          Dubbi? <Faq buttonClassName = "font-semibold !text-base !text-indigo-50" buttonText="Dai un'occhiata alle FAQ" />
        </p>
        <p>
          Puoi trovare ulteriori informazioni sui portali <ExternalLink  className = "font-semibold !text-base !text-indigo-50" text = "Connetti Italia" href = "https://connetti.italia.it/"/> e <ExternalLink  className = "font-semibold !text-base !text-indigo-50" text = "Banda Ultralarga" href = "https://bandaultralarga.italia.it/"/>
        </p>
      </div>
    </div>
  );
};

export default InfoDisplay;
