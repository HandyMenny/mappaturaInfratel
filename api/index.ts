import memoize from "memoizee";
import toast from "react-hot-toast";

const API_URL = "https://mappatura2021.ranghieri.com";

export class HTTPError extends Error {
  status = 0;
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}

export const APIErrorToast = ({ status }: HTTPError) => {
  if (status === 429) {
    toast.error("Hey, vacci piano!\nRiprova tra una decina di minuti.", {
      id: "search-field-too-many-requests-error",
    });
  } else {
    toast.error("Errore nel comunicare con il server.\nRiprova più tardi.", {
      id: "search-field-error",
    });
  }
};

const fetchAPI = async (query: string) => {
  const res = await fetch(`${API_URL}${query}`);

  if (!res.ok) {
    throw new HTTPError(res.statusText, res.status);
  }

  return res.json();
};

const memoFetchAPI = memoize(fetchAPI, { promise: true, primitive: true });

export const fetchRegions = () => memoFetchAPI("/regions");

export const fetchProvinces = (region: string) =>
  memoFetchAPI(`/${encodeURIComponent(region)}/provinces`);

export const fetchCities = (province: string) =>
  memoFetchAPI(`/${encodeURIComponent(province)}/cities`);

export const fetchStreets = (province: string, city: string) =>
  memoFetchAPI(
    `/${encodeURIComponent(province)}/${encodeURIComponent(city)}/streets`
  );

export const fetchNumbers = (province: string, city: string, street: string) =>
  memoFetchAPI(
    `/${encodeURIComponent(province)}/${encodeURIComponent(
      city
    )}/${encodeURIComponent(street)}/numbers`
  );

export const fetchEgonData = (egon: string) => memoFetchAPI(`/egon?id=${egon}`);
