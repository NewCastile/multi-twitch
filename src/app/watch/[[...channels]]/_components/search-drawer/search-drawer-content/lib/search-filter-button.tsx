"use client";

const SearchFilterButton = ({
  disabled,
  isActive,
  onClickHandler,
  children,
}: {
  disabled?: boolean;
  isActive?: boolean;
  onClickHandler: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`btn-sm ${isActive ? "bg-monokai-red-dark" : "btn-monokai-red"}`}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default SearchFilterButton;
