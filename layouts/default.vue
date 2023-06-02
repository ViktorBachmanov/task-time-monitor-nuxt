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
  padding: 2em;
}

</style>