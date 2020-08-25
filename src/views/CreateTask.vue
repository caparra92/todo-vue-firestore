<template>
  <v-app>
      <NavBar/>
      <BottomNav/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import BottomNav from '@/components/BottomNav'

export default {
    name: 'CreateTask',
    components: {
        NavBar,
        BottomNav
    }
}
</script>

<style>

</style>