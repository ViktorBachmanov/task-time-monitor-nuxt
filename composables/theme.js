export function useTheme() {
  const theme = ref("dark");

  const themeStorageKey = "theme_ttm";

  const toggleTheme = () => {
    switch (theme.value) {
      default:
      case "light":
        theme.value = "dark";
        document.documentElement.classList.add("dark");
        localStorage[themeStorageKey] = "dark";
        break;
      case "dark":
        theme.value = "light";
        document.documentElement.classList.remove("dark");
        localStorage[themeStorageKey] = "light";
        break;
    }
  };

  return {
    // theme,
    toggleTheme,
  };
}
