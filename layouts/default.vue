<template>
  <div>
    <AppBar />

    <main>
      <slot />
    </main>
  </div>
</template>


<style lang="scss" scoped>
main {
  padding: 1em;

  @media (min-width: 420px) {
    padding: 2em;
  }
}

</style>