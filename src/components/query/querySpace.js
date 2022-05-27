import { Fragment } from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/cobalt.css";

import { getPropTypes } from "../../utils";

/**
 * The component to display the code editor for the SQL query
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function QuerySpace(props) {
  return (
    <Fragment>
      <CodeMirror
        value={props.defaultQuery}
        options={{
          mode: "sql",
          theme: "cobalt",
          lineNumbers: true,
        }}
      />
    </Fragment>
  );
}

QuerySpace.propTypes = getPropTypes("defaultQuery");

export default QuerySpace;
