import PropTypes from 'prop-types';

const TileGrid = ({ gridTemplate, children }) => (
  <div className="grid gap-1 flex-1 overflow-auto" style={{ gridTemplate }}>
    {children}
  </div>
);

TileGrid.propTypes = {
  gridTemplate: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TileGrid;
