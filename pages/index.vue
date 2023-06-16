<template>
  <div id="home-view">
    <Suspense>
      <TheProjects />
    </Suspense>

    <Suspense>
      <TheSessions />
    </Suspense>
  </div>
</template>


<style lang="scss" scoped>
#home-view {
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 8em auto;
    column-gap: 1em;
    justify-items: center;
  }
}
</style>