const themeStorageKey = "theme_ttm";

if (localStorage[themeStorageKey] === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//   const faviconElem: HTMLImageElement | null = document.getElementById("favicon");
//   if(faviconElem) {
//     faviconElem.href = "/favicon-dark.png";
//   }
// }

// export { themeStorageKey };
