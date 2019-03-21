import React from "react";
import PropTypes from "prop-types";
import { Icon } from "expo";

function TabBarIcon({ name, tintColor }) {
  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={tintColor}
    />
  );
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired
};

export default TabBarIcon;
