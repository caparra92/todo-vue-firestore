<template>
  <v-app>
    <NavBar />
    <v-main>
      <div class="justify-center align-center layout mt-5">
        <v-card class="mt-5">
            <v-card-title>My tasks</v-card-title>
        </v-card>
      </div>
    </v-main>
    <BottomNav />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import BottomNav from "@/components/BottomNav";

export default {
  name: "Tasks",
  components: {
    NavBar,
    BottomNav,
  },
};
</script>

<style>
</style>