export const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--lighter-background-color)",
    color: "var(--primary-text-color)",
    borderColor: state.isFocused
      ? "var(--primary-color)"
      : "var(--secondary-text-color)",
    boxShadow: state.isFocused ? "0 0 0 1px var(--primary-color)" : "none",
    ":hover": { borderColor: "var(--primary-color)" },
    minHeight: 36,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--lighter-background-color)",
    color: "var(--primary-text-color)",
    zIndex: 9999, // only needed if NOT using portal
  }),
  // 👇 this is the scroll container
  menuList: (base) => ({
    ...base,
    maxHeight: 200, // ~10 items
    overflowY: "auto",
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--primary-color)"
      : state.isFocused
      ? "rgba(0,0,0,0.12)"
      : "var(--lighter-background-color)",
    color: state.isSelected ? "#fff" : "var(--primary-text-color)",
    cursor: "pointer",
  }),
  singleValue: (b) => ({ ...b, color: "var(--primary-text-color)" }),
  input: (b) => ({ ...b, color: "var(--primary-text-color)" }),
  placeholder: (b) => ({ ...b, color: "var(--secondary-text-color)" }),
  dropdownIndicator: (b, state) => ({
    ...b,
    color: "var(--primary-text-color)",
    ":hover": { color: "var(--primary-text-color)" },
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    transition: "transform 120ms ease",
  }),
  indicatorSeparator: () => ({ display: "none" }),
};
