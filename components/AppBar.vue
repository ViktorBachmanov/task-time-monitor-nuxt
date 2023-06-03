<template setup>
  <div id="app-bar">
    <nav>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/about">
        About
      </NuxtLink>
    </nav>

    <BrightnessIcon />
  </div>
</template>


<style lang="scss" scoped>
#app-bar {
  padding: 1em;
  display: flex;
  justify-content: space-between;

  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  background-color: $bg-light-1;

  .dark & {
    background-color: $bg-dark-1;
  }
}

nav {
  display: flex;
  column-gap: 0.5em;
}

a {
  display: inline-block;
  padding: 0.5em;
  border-radius: 0.5em;
  border: 1px solid blue;
}
</style>