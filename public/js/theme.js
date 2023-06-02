const themeStorageKey = "theme_ttm";

if (
  localStorage[themeStorageKey] === "dark" ||
  (!(themeStorageKey in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
