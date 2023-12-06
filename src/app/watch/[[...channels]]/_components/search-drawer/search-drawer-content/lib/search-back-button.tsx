"use client";

const SearchBackButton = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <button className={"btn-sm btn-monokai-red"} onClick={onClickHandler}>
      Show less
    </button>
  );
};

export default SearchBackButton;
