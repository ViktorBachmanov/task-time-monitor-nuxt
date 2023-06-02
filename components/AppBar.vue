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