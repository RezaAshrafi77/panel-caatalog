import { useState, useEffect } from "react";
import { connect } from "react-redux";

export const Information = ({ template, loading }) => {
  return <div className="flex flex-1 flex-col"></div>;
};

const mapStateToProps = (state) => ({
  template: state.template.template,
  loading: state.template.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Information);
