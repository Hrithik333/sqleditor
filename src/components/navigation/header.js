import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

import { getPropTypes, openNewTab } from "../../utils";

/**
 * The React component to display the header.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Header(props) {
  return (
    <Navbar className="shadow p-3">
      <Container fluid>
        <Navbar.Text>
          <Button
            variant={"outline-primary"}
            onClick={() => {
              openNewTab(
                {
                  title: `Query ${props.queryCount}`,
                  entries: [],
                },
                props.tabs,
                props.setTabs,
                props.setActiveKey
              );
              props.setQueryCount(props.queryCount + 1);
            }}
            style={{
              marginRight: "1rem",
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> New Query
          </Button>
          <Button
            variant={"outline-primary"}
            className="d-lg-none"
            onClick={() => {
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            aria-controls="sidebar"
            aria-expanded={props.sidebarOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

Header.propTypes = getPropTypes(
  "queryCount",
  "tabs",
  "setTabs",
  "setActiveKey",
  "setQueryCount",
  "setSidebarOpen",
  "sidebarOpen"
);

export default Header;
