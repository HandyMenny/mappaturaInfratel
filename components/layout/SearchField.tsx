import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });

import { useSearchContext } from "../../context/SearchContext";
import { ActionTypes } from "../../reducers/SearchReducer";

import {
  fetchRegions,
  fetchProvinces,
  fetchCities,
  fetchStreets,
  fetchNumbers,
  APIErrorToast,
  HTTPError,
} from "../../api";

type Props = {
  context: "regions" | "provinces" | "cities" | "streets" | "numbers";
  disabled?: boolean;
  title: "Regione" | "Provincia" | "Città" | "Via" | "Civico";
  className?: string;
  menuPlacement: "auto" | "top" | "bottom";
  showOptionsOnClick?: boolean;
};

interface SelectOption {
  label?: string;
  value?: string;
  egon?: string;
  isDisabled?: boolean;
  point: number;
}

const makeSelectOptions = (
  data: string[]
): { label: string; value: string }[] =>
  data.map((d) => ({
    value: d,
    label: d,
  }));

const makeNumbersSelectOptions = (data: { number: string; egon: string }[]) =>
  data.map((d) => ({ value: d.number, label: d.number, egon: d.egon }));

const SearchField = ({
  context,
  disabled,
  title,
  className,
  menuPlacement,
  showOptionsOnClick = false,
}: Props) => {
  const { state, dispatch } = useSearchContext();
  const [fetchedData, setFetchedData] = useState<SelectOption[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const contextFn = useCallback(
    ({
      get,
      fetch,
      payload,
      egon,
    }: {
      get?: boolean;
      fetch?: boolean;
      payload?: string;
      egon?: string;
    }) => {
      switch (context) {
        case "regions":
          return get
            ? state.region
            : fetch
            ? fetchRegions()
            : dispatch({ type: ActionTypes.SET_REGION, payload });
        case "provinces":
          return get
            ? state.province
            : fetch
            ? fetchProvinces(state.region!)
            : dispatch({ type: ActionTypes.SET_PROVINCE, payload });
        case "cities":
          return get
            ? state.city
            : fetch
            ? fetchCities(state.province!)
            : dispatch({ type: ActionTypes.SET_CITY, payload });
        case "streets":
          return get
            ? state.street
            : fetch
            ? fetchStreets(state.province!, state.city!)
            : dispatch({ type: ActionTypes.SET_STREET, payload });
        case "numbers":
          return get
            ? state.number
            : fetch
            ? fetchNumbers(state.province!, state.city!, state.street!)
            : dispatch({ type: ActionTypes.SET_NUMBER_EGON, payload, egon });
        default:
          return;
      }
    },
    [context, dispatch, state]
  );

  const getValueByContext = () => {
    const data = contextFn({ get: true });

    if (!data) {
      return null;
    }

    return { label: data, value: data };
  };

  const fetchOptionsByContext = useCallback(async () => {
    if (disabled) {
      return;
    }

    try {
      const data = await contextFn({ fetch: true });

      if (context === "numbers") {
        setFetchedData(makeNumbersSelectOptions(data));
        return;
      }

      setFetchedData(makeSelectOptions(data));
    } catch (e) {
      console.error(e);
      APIErrorToast(e as HTTPError);
    }
  }, [context, contextFn, disabled]);

  const setStateByContext = ({
    payload,
    egon,
  }: {
    payload: string;
    egon?: string;
  }) => {
    contextFn({ get: false, payload, egon });
  };

  const filterText = ({ label }, filter) => {
    filter = filter.toLowerCase().trim().split(/[\s,\-+]+/)
    label = label.toLowerCase().trim();
    const regexPattern = filter.join("|");
    return label.match(new RegExp(regexPattern, 'g'))?.join().length || 0;
  }
  const filterText2 = ({ label }, filter) => {
    filter = filter.toLowerCase().trim().split(/[\s,\-+]+/)
    label = label.toLowerCase().trim();
    const regexPattern = filter.join("|");
    return label.match(new RegExp(regexPattern, 'g')) || 0;
  }

  const filterFetchedData = useCallback((): SelectOption[] => {
    if (!showOptionsOnClick && !!!inputValue) {
      return [
        {
          label: "Digita un nome",
          value: "__search_placeholder",
          isDisabled: true,
        },
      ];
    }
    if (context !== "streets") {
      return fetchedData;
      let data = fetchedData;
      data.forEach(it => {
        it.point = filterText(it, inputValue)
      });
      data = data.filter(({point}) => point !== 0).sort(
        ({label: aLabel, point: aSearch}, {label: bLabel, point: bSearch}) =>
          bSearch - aSearch || aLabel!.localeCompare(bLabel!) || aLabel!.length - bLabel!.length
      ).slice(0, 100);
      return data;
    }
  }, [fetchedData, showOptionsOnClick, inputValue, context]);

  useEffect(() => {
    fetchOptionsByContext();
  }, [state, fetchOptionsByContext]);

  return (
    <div className="w-full">
      <h3 className="text-indigo-200 text-xl mb-3">{title}</h3>
      <Select
        isDisabled={disabled}
        cacheOptions
        defaultOptions
        options={filterFetchedData()}
        onInputChange={(value) => setInputValue(value)}
        menuPlacement={menuPlacement}
        styles={{
          control: (styles, { isDisabled }) => {
            return {
              ...styles,
              backgroundColor: isDisabled ? "#b0b0b0" : "#f7f7f7",
              fontStyle: isDisabled ? "italic" : "normal",
            };
          },
          option: (styles, { isDisabled, isFocused }) => {
            return {
              ...styles,
              backgroundColor: isDisabled
                ? "transparent"
                : isFocused
                ? "#deebff"
                : "white",
              color: "#4760a3",
            };
          },
          placeholder: (styles) => {
            return {
              ...styles,
              lineHeight: "1rem",
            };
          },
        }}
        value={getValueByContext()}
        onChange={({ value, egon }: any) => {
          setStateByContext({ payload: value, egon: egon });
        }}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "" : "Nessun risultato"
        }
        className={`w-full text-blue-900 ${className}`}
        placeholder={`${
          showOptionsOnClick ? "Seleziona" : "Cerca"
        } ${title.toLowerCase()}`}
        filterOption={filterText2}
      />
    </div>
  );
};

export default SearchField;
