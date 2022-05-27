import "./App.css";
import Header from "./components/navigation/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SideBar from "./components/navigation/sideBar";
import QueryTabs from "./components/tabs";
import { useState } from "react";
import "@fontsource/raleway";
import "./css/index.css";

function App() {
  const [activeKey, setActiveKey] = useState("");
  const [tabs, setTabs] = useState([]);
  const [queryCount, setQueryCount] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        tabs={tabs}
        setTabs={setTabs}
        queryCount={queryCount}
        setQueryCount={setQueryCount}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      {/* <Collapse in={sidebarOpen}>
        <div>
          <SideBar
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            tabs={tabs}
            setTabs={setTabs}
            mobile
          />
        </div>
      </Collapse> */}
      <Container fluid>
        <Row>
          <Col lg={3} md={5} className={"d-none d-lg-block d-xl-block"}>
            <SideBar
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              tabs={tabs}
              setTabs={setTabs}
            />
          </Col>

          <Col
            lg={8}
            md={9}
            style={{
              padding: "1rem",
            }}
          >
            <QueryTabs
              tabs={tabs}
              setTabs={setTabs}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
