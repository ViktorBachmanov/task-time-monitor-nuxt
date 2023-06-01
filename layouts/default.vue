<template>
  <div>
    Some default layout shared across all pages
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <NuxtLink to="/about">
      About
    </NuxtLink>
    <slot />
  </div>
</template>
