import { useState } from "react";
import {
  APIErrorToast,
  fetchBULEgon,
  fetchEgonData,
  HTTPError,
} from "../../api";
import { useSearchContext } from "../../context/SearchContext";
import { EgonData } from "../../interfaces/egon";
import { ActionTypes } from "../../reducers/SearchReducer";
import Separator from "../layout/Separator";
import FormButton from "../ui/FormButton";
import Spinner from "../ui/Spinner";
import InfoDisplay from "./InfoDisplay";
import SearchField from "./SearchField";

const SearchContainer = () => {
  const { state, dispatch } = useSearchContext();
  const [egonData, setEgonData] = useState<EgonData | null>(null);
  const [infoLoading, setInfoLoading] = useState<boolean>(false);

  const handleClearForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEgonData(null);

    dispatch({ type: ActionTypes.RESET });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.egon) {
      return;
    }
    setInfoLoading(true);
    setEgonData(null);

    try {
      const egonData = await fetchEgonData(state.egon);

      try {
        // Fetch year from BUL API via EGON.
        const { anno_intervento_a: bulYear } = await fetchBULEgon(state.egon);
        setEgonData({ ...egonData, bulYear });
      } catch (e) {
        setEgonData(egonData);
        console.error(e);
      }
    } catch (e) {
      console.error(e);
      APIErrorToast(e as HTTPError);
    } finally {
      setInfoLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch w-full pb-5 gap-10 lg:gap-20">
      <form
        className="flex flex-col items-center gap-6 w-80 sm:w-[28rem]"
        onSubmit={handleSubmit}
      >
        <SearchField
          title="Regione"
          context="regions"
          menuPlacement="bottom"
          showOptionsOnClick
        />
        <SearchField
          title="Provincia"
          context="provinces"
          disabled={!state.region}
          menuPlacement="bottom"
          showOptionsOnClick
        />
        <SearchField
          title="Città"
          context="cities"
          disabled={!state.region || !state.province}
          menuPlacement="bottom"
          showOptionsOnClick
        />
        <div className="flex w-full gap-2">
          <SearchField
            title="Via"
            context="streets"
            disabled={!state.region || !state.province || !state.city}
            menuPlacement="top"
          />
          <SearchField
            title="Civico"
            context="numbers"
            disabled={
              !state.region || !state.province || !state.city || !state.street
            }
            menuPlacement="top"
            showOptionsOnClick
          />
        </div>

        <div className="flex justify-center items-center gap-5">
          <FormButton
            disabled={!state.egon}
            className="bg-yellow-400 text-blue-900"
            type="submit"
          >
            {(!!state.egon && !!egonData) || infoLoading
              ? "Riesegui la ricerca"
              : "Esegui la ricerca"}
          </FormButton>
          {!!egonData && !!state.egon && (
            <FormButton
              className="bg-red-500 text-indigo-100"
              type="button"
              onClick={handleClearForm}
            >
              Pulisci i campi
            </FormButton>
          )}
        </div>
      </form>
      {infoLoading && !egonData && (
        <>
          <Separator />
          <div className="flex items-center justify-center w-80">
            <Spinner />
          </div>
        </>
      )}
      {!infoLoading && !!egonData && (
        <>
          <Separator />
          <InfoDisplay data={egonData} />
        </>
      )}
    </div>
  );
};

export default SearchContainer;