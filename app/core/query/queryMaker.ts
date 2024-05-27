import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

const getQuery = () => {
  const search = window.location.search;
  return searchStringToObject(search);
};
const makeQuery = (encodedParams: EncodedQuery): string => {
  const paramsString = objectToSearchString(encodedParams);
  const pathname = window.location.pathname;
  return `${pathname}?${paramsString}`;
};
const setQuery = (
  encodedParams: EncodedQuery,
  replace: (href: string, options?: NavigateOptions | undefined) => void
) => {
  replace(makeQuery(encodedParams));
};
const getQueryByKey = (key: string) => {
  const queryObj = getQuery();
  if (queryObj.hasOwnProperty(key)) return queryObj[key];
  return null;
};
const addQuery = (
  encodedParams: EncodedQuery,
  replace: (href: string, options?: NavigateOptions | undefined) => void
) => {
  const current = getQuery();
  const queryToAdd = objectToSearchString({ ...current, ...encodedParams });
  const pathname = window.location.pathname;
  replace(`${pathname}?${queryToAdd}`);
};

interface EncodedQuery {
  [key: string]: string | (string | null)[] | null | undefined;
}
function objectToSearchString(encodedParams: EncodedQuery): string {
  const params = new URLSearchParams();
  const entries = Object.entries(encodedParams);

  for (const [key, value] of entries) {
    if (value === undefined) continue;
    if (value === null) continue;
    if (value === "") continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        params.append(key, item ?? "");
      }
    } else {
      params.append(key, value);
    }
  }

  return params.toString();
}
function searchStringToObject(searchString: string): EncodedQuery {
  console.log("are");

  const params = new URLSearchParams(searchString);
  const parsed: EncodedQuery = {};
  for (let [key, value] of params) {
    if (Object.prototype.hasOwnProperty.call(parsed, key)) {
      if (Array.isArray(parsed[key])) {
        (parsed[key] as string[]).push(value);
      } else {
        parsed[key] = [parsed[key] as string, value];
      }
    } else {
      parsed[key] = value;
    }
  }

  return parsed;
}

export { getQuery, makeQuery, setQuery, getQueryByKey, addQuery };
