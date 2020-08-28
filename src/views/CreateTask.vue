<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="d-flex justify-center align-center layout mt-5">
        <v-row justify="center">
          <v-col md="5" lg="5">
            <v-card class="mt-5">
              <v-card-title>New task</v-card-title>
              <v-form :lazy-validation="true" class="mx-2 px-2 my-5 py-2" @submit.prevent="createTask">
                <v-text-field label="Title" required :rules="inputRules" v-model="newTask.title">Title</v-text-field>
                <v-text-field label="Description" required :rules="inputRules" v-model="newTask.description">Description</v-text-field>
                <v-btn color="warning" class="my-2" @click="createTask" :disabled="!valid">Add</v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <BottomNav />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import BottomNav from "@/components/BottomNav";
import Toastr from 'toastr'

export default {
  name: "CreateTask",
  components: {
    NavBar,
    BottomNav,
  },
  data() {
    return {
      newTask: {
          title: '',
          description: '',
          status: false
      },
      inputRules: [
        v => !!v || 'This field is required'
      ],
      valid: true
    };
  },
  methods: {
    createTask() {
      if(this.newTask.title !== '' && this.newTask.description !== '') {
        this.$store.dispatch('createTask', this.newTask)
        .then(() => {
          Toastr.success('Task created successfully!', 'Task created',{timeOut: 2000})
          this.newTask = {}
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  },
};
</script>

<style>
</style>