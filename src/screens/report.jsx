import { useState, useEffect } from "react";
import { connect } from "react-redux";

export const Report = ({ }) => {
  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden bg-green-400 pt-16 md:pt-12">
      report
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
