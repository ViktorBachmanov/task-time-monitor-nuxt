<script setup lang="ts">
useHead({
  title: 'Task-Time-Monitor',
  script: [ { src: '/ts/theme.ts' } ]
})


const { data } = await useFetch('/api/hello')

const tasks = useState<any>('tasks', () => data.value?.rows)


</script>


<template>
  <div id="first_component">
  First component
</div>
</template>


<style lang="scss" scoped>
#first_component {
  margin: 10em;

  .dark & {
    background-color: $bg-dark-0;
    color: silver;
  }
}


</style>

