import { useEffect, useMemo, useState } from "react";
import { getFieldDetails, parseCSV } from "../utils";
import FILE_NAMES from "../data/fileNames";

/**
 * A custom React hook for obtaining the entries of a table. This function has been adapted for the CSV files in the
 * GitHub repository of graphql-compose-examples. However, it can be adapted to particular usecases too.
 * @param {string} fileName
 * @returns {{result: *[], timeOfRequest: number, error: string, isLoaded: boolean}}
 */
function useFile(fileName) {
  const startTime = useMemo(() => new Date().getTime(), []);
  const [endTime, setEndTime] = useState(new Date().getTime());
  const [result, setResult] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const inProduction = process.env.NODE_ENV === "production";

  // The endpoint is used only when the app is in production.
  const fetchUrl = inProduction
    ? `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${fileName}.csv?ref=master`
    : `http://localhost:3000/data/${fileName}.csv`;

  useEffect(() => {
    // If the file name can't be found.
    if (FILE_NAMES.indexOf(fileName) === -1) {
      setIsLoaded(true);
    } else {
      fetch(fetchUrl)
        .then((res) => {
          return inProduction ? res.json() : res.text();
        })
        .then(
          (res) => {
            // GitHub sends over base64 encoded content
            const rawResults = inProduction
              ? parseCSV(atob(res.content))
              : parseCSV(res);
            setResult(
              rawResults.map((rawResult) => {
                // Use the custom processing function for each field type.
                Object.keys(rawResult).forEach((key) => {
                  rawResult[key] = getFieldDetails(key).processFn(
                    rawResult[key]
                  );
                });
                return rawResult;
              })
            );
            setIsLoaded(true);
            setEndTime(new Date().getTime());
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            setEndTime(new Date().getTime());
          }
        );
    }
  }, [fetchUrl, fileName, inProduction]);

  return {
    error,
    isLoaded,
    result,
    timeOfRequest: endTime - startTime,
  };
}

export default useFile;
