"use client";

const SearchNextButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button className={"btn-sm btn-monokai-red"} onClick={onClickHandler}>
      Show more
    </button>
  );
};

export default SearchNextButton;
