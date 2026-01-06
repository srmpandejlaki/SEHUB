import React from "react";
import IconSearch from "../../assets/icon/ic_round-search.svg?react";

function SearchFilter({ value, onChange, placeholder = "Search" }) {
  return (
    <div className="search-filter">
      <div className="search">
        <IconSearch className="icon blackIcon" />
        <input 
          type="text" 
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchFilter;