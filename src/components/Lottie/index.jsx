import { useState } from "react";
import PropTypes from "prop-types";
import Lottie from "react-lottie";

const LottiePlayer = ({
  src,
  isStopped,
  isPaused,
  isClickToPauseDisabled,
  width,
  height,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: src,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [animation] = useState({
    isStopped,
    isPaused,
    isClickToPauseDisabled,
  });

  return (
    <div className="lottieCont">
      <Lottie
        options={defaultOptions}
        width={width}
        height={height}
        isPaused={animation.isPaused}
        isStopped={animation.isStopped}
        isClickToPauseDisabled={animation.isClickToPauseDisabled}
      />
    </div>
  );
};

LottiePlayer.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isStopped: PropTypes.bool,
  isPaused: PropTypes.bool,
  isClickToPauseDisabled: PropTypes.bool,
};

LottiePlayer.defaulrProps = {
  isStopped: false,
  isPaused: false,
  isClickToPauseDisabled: false,
};

export default LottiePlayer;
