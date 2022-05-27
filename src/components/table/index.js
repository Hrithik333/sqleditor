import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Pagination from "react-bootstrap/Pagination";
import { getPropTypes } from "../../utils";

/**
 * The parent component used to display the results.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BaseTable(props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  if (!props.isLoaded) {
    return (
      <Container className="h-100">
        <Row className="justify-content-center">
          <Spinner animation="border" role="status" as="span" />
          Loading...
        </Row>
      </Container>
    );
  } else if (props.error !== null) {
    return (
      <Container className="h-100">
        <Row className="justify-content-center h-100 align-items-center">
          <h4 className="text-secondary text-center align-self-center">
            Could not load results
          </h4>
        </Row>
      </Container>
    );
  }

  const dropdownItems = [5, 10, 15, 20, 25].map((numEntries) => (
    <option value={numEntries} key={numEntries}>
      {numEntries}
    </option>
  ));

  const entriesDropdown = (
    <FloatingLabel label="No. of entries per page">
      <Form.Select
        onChange={(e) => {
          setPageSize(parseInt(e.target.value));
        }}
        defaultValue={pageSize}
        disabled={page.length === 0}
        id="numEntriesPerPage"
      >
        {dropdownItems}
      </Form.Select>
    </FloatingLabel>
  );

  const pageControls = (
    <Pagination size={"lg"} className="justify-content-center">
      <Pagination.First
        disabled={pageIndex === 0}
        onClick={() => gotoPage(0)}
      />
      <Pagination.Prev disabled={!canPreviousPage} onClick={previousPage} />

      <Pagination.Next disabled={!canNextPage} onClick={nextPage} />
      <Pagination.Last
        disabled={pageIndex === pageCount - 1}
        onClick={() => gotoPage(pageCount - 1)}
      />
    </Pagination>
  );

  // const resultStats = (
  //   <Col lg={4}>
  //     <Alert variant={"success"}>
  //       <FontAwesomeIcon icon={faCheck} /> Fetched{" "}
  //       <strong>{rows.length}</strong> results in{" "}
  //       <strong>{props.timeOfRequest / 1000}</strong> seconds
  //     </Alert>
  //   </Col>
  // );

  const finalResult = props.paginate ? page : rows;

  return (
    <Container fluid className="h-100">
      <Row>
        {/* {props.timeOfRequest ? resultStats : <></>} */}
        <Col lg={4}>
          <FloatingLabel label="Search to filter results">
            <Form.Control
              aria-label="Text input to filter results"
              onInput={(e) => {
                setGlobalFilter(e.target.value);
              }}
              id="filterInput"
              disabled={rows.length === 0}
            />
          </FloatingLabel>
        </Col>
        <Col lg={4}>{props.paginate ? entriesDropdown : <></>}</Col>
      </Row>
      <Row
        style={{
          maxHeight: "29vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
        className="mt-3"
      >
        <Table {...getTableProps()} striped hover size={"sm"} className="h-100">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}{" "}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {finalResult.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row className="mt-2">
        <Col>{props.paginate ? pageControls : <></>}</Col>
      </Row>
    </Container>
  );
}

BaseTable.propTypes = getPropTypes(
  "columns",
  "data",
  "isLoaded",
  "error",
  "paginate",
  "timeOfRequest"
);

export default BaseTable;
