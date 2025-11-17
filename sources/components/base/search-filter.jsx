import React from "react";
import IconSearch from "../../assets/icon/ic_round-search.svg?react";
import IconFilter from "../../assets/icon/line-md_filter.svg?react";

function SearchFilter() {
  return (
    <div className="search-filter">
      <div className="search">
        <IconSearch className="icon blackIcon" />
        <input type="text" placeholder="Search" />
      </div>
      <div className="filter">
        <IconFilter className="icon whiteIcon" />
        <input type="text" placeholder="Filter" />
      </div>
    </div>
  );
}

export default SearchFilter;