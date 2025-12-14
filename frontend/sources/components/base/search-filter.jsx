import React from "react";
import IconSearch from "../../assets/icon/ic_round-search.svg?react";

function SearchFilter() {
  return (
    <div className="search-filter">
      <div className="search">
        <IconSearch className="icon blackIcon" />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default SearchFilter;