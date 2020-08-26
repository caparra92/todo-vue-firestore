<template>
  <v-app-bar :color="'white '+color+'--text'" dense fixed>
    <router-link to="/" class="red--text text-decoration-none"><v-toolbar-title>To Do App</v-toolbar-title></router-link>

    <v-spacer></v-spacer>
    
    <slot/>
  </v-app-bar>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        color: {
            type: String,
            default:'red'
        }
    }
};
</script>

<style>
</style>