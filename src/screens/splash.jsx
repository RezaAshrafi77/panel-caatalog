import { connect } from "react-redux";
import { useEffect } from "react";

import { Loading, Image } from "../components";

export const Splash = ({}) => {
  useEffect(() => {}, []);

  return (
    <div className="relative flex flex-1 flex-col justify-center items-center max-w-full max-h-full h-full overflow-hidden bg-background">
      <Image src={"/catalog.png"} classNames="w-[95%] md:max-w-[30%]" />
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <Loading type="dot-falling fill-red-500" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.template,
});

export default connect(mapStateToProps)(Splash);
