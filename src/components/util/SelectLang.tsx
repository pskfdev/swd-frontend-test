import React from "react";

type Props = {};

function SelectLang({}: Props) {
  return (
    <select
      name="lang"
      id="lang"
      className="bg-white p-1 rounded-md absolute top-2 right-2"
    >
      <option value="EN">EN</option>
      <option value="TH">TH</option>
    </select>
  );
}

export default SelectLang;
