const themeStorageKey = "theme_ttm";

if (localStorage[themeStorageKey] === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// export { themeStorageKey };
