export function useTheme() {
  const theme = ref("dark");

  const toggleTheme = () => {
    switch (theme.value) {
      case "light":
        theme.value = "dark";
        document.documentElement.classList.add("dark");
        break;
      case "dark":
        theme.value = "light";
        document.documentElement.classList.remove("dark");
        break;
      default:
        theme.value = "dark";
        document.documentElement.classList.add("dark");
        break;
    }
  };

  return {
    // theme,
    toggleTheme,
  };
}
