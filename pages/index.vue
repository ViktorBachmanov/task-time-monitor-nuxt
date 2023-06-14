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
  @media (min-width: 600px) {
    column-count: 2;
  }
}
</style>