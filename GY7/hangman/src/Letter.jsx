import cn from "classnames";
import PropTypes from "prop-types";

const Letter = ({ missing, visible, children }) => (
  <span className={cn({ hianyzo: missing })}>{visible && children}</span>
);
Letter.propTypes = {
  missing: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Letter;
