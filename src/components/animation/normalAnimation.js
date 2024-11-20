function normalAnimation(delay) {
  let animation = {
    initial: {
      opacity: 0,
      transform: "translateY(15px)",
    },
    animate: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    transition: {
      duration: 0.7,
      type: "spring",
      delay: delay,
    },
  };

  return animation;
}

export default normalAnimation;