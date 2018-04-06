import React from "react";
import Markdown from "../Markdown";

const SpecInformation = ({ title, version, description }) => (
  <div>
    <h1>{title}</h1>
    <p>Version: {version}</p>
    <Markdown markdown={description} />
  </div>
);

export default SpecInformation;
