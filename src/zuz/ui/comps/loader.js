import React from "react";

function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      className={`app-loader`}
    >
      <circle cx="30" cy="50" r="20" fill="#06f">
        <animate
          attributeName="cx"
          begin="-0.3496503496503497s"
          dur="0.6993006993006994s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="30;70;30"
        ></animate>
      </circle>
      <circle cx="70" cy="50" r="20" fill="#5d9eff">
        <animate
          attributeName="cx"
          begin="0s"
          dur="0.6993006993006994s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="30;70;30"
        ></animate>
      </circle>
      <circle cx="30" cy="50" r="20" fill="#06f">
        <animate
          attributeName="cx"
          begin="-0.3496503496503497s"
          dur="0.6993006993006994s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="30;70;30"
        ></animate>
        <animate
          attributeName="fill-opacity"
          calcMode="discrete"
          dur="0.6993006993006994s"
          keyTimes="0;0.499;0.5;1"
          repeatCount="indefinite"
          values="0;0;1;1"
        ></animate>
      </circle>
    </svg>
  );
}

export default Loader;
