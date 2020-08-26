<template>
  <v-app-bar class="red" fixed bottom>
    <v-spacer></v-spacer>
    <v-btn-toggle group class="d-flex justify-center">
      <div class="d-flex flex-column v-btn">
        <v-btn icon class="white--text" to="/new">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
        <span class="text-sm-body-2 white--text mb-2">New Task</span>
      </div>
    </v-btn-toggle>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
    name: 'BottomNav'
};
</script>

<style>
</style>