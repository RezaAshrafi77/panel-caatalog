import { useState, useEffect } from "react";
import { connect } from "react-redux";

export const Templates = ({}) => {
  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden bg-indigo-400">
      customers
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
