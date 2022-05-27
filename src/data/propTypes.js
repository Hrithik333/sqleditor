import PropTypes from "prop-types";

const tabPropType = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
  defaultQuery: PropTypes.string.isRequired,
};

export const PROP_TYPES = {
  queryCount: PropTypes.number.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape(tabPropType)),
  setTabs: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  setQueryCount: PropTypes.func.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  activeKey: PropTypes.string.isRequired,
  defaultQuery: PropTypes.string.isRequired,
  mobile: PropTypes.bool,
  tab: PropTypes.shape(tabPropType),
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  error: PropTypes.string,
  paginate: PropTypes.bool,
  timeOfRequest: PropTypes.number,
};
