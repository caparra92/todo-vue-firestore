<template>
  <v-app-bar :color="'white '+color+'--text'" dense fixed>
    <v-toolbar-title>To Do App</v-toolbar-title>

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