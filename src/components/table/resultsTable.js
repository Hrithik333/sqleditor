import { useMemo } from "react";

import BaseTable from "./index";
import ColumnsTable from "./columnsTable";

import { getPropTypes } from "../../utils";

/**
 * The table with the results of the run query operation. Uses the BaseTable component to display the results in a
 * table.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ResultsTable(props) {
  const { result, isLoaded, error, timeOfRequest } = props;
  const data = useMemo(() => result, [result]);

  const columns = useMemo(() => {
    if (result.length === 0) {
      return [];
    }
    return Object.keys(result[0]).map((key) => ({
      Header: key,
      accessor: key,
      defaultCanSort: true,
    }));
  }, [result]);

  return (
    <BaseTable
      columns={columns}
      data={data}
      isLoaded={isLoaded}
      error={error}
      paginate
      timeOfRequest={timeOfRequest}
    />
  );
}

ColumnsTable.propTypes = getPropTypes("tab");

export default ResultsTable;
