<template>
  <v-app>
    <NavBar />
    <v-main>
      <div class="d-flex justify-center align-center my-5 py-5">
        <v-container fluid class="align-center justify-center">
          <h1 class="text-center">My tasks</h1>
          <div class="justify-center align-center my-5" v-for="task in tasks" :key="task.id">
            <v-row class="d-flex justify-center align-center">
              <v-col md="2" lg="2">
                <v-radio-group v-model="done">
                    <v-radio class="pt-2" :value="task.id"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col md="6" lg="2" class="justify-center align-center">
                <p :class="{'text-decoration-line-through': radios}" class="title text-center">{{task.title}}</p>
                <p class="grey--text text-center">{{task.description}}</p>
              </v-col>
              <v-col md="2" lg="2">
                <v-btn icon @click="editTask(task.id)">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col md="2" lg="2">
                <v-btn icon @click="deleteTask(task.id)">
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </div>
      <v-dialog v-model="dialog" width="500" v-for="tsk in selectedTask" :key="tsk.id">
        <v-card>
          <v-card-title class="headline grey lighten-2">Update task</v-card-title>

          <v-form class="px-5 py-5">
            <v-text-field :value="tsk.title" ref="title"></v-text-field>
            <v-text-field :value="tsk.description" ref="description"></v-text-field>
            <div class="d-flex">
              <v-radio-group v-model="radios" :mandatory="false">
                <v-radio label="In progress" value="false"></v-radio>
                <v-radio label="Done" value="true"></v-radio>
              </v-radio-group>
            </div>
          </v-form>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="warning" text @click="updateTask(tsk.id)">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
    <BottomNav />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import BottomNav from "@/components/BottomNav";
import Toastr from "toastr";

export default {
  name: "Tasks",
  components: {
    NavBar,
    BottomNav,
  },
  created() {
    this.$store.getters.database
      .collection(`tasks`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          const task = {
            ...change.doc.data(),
            id: change.doc.id,
          };
          switch (change.type) {
            case "added":
              // Task added
              this.$store.commit("ADD_TASK", task);
              break;
            case "modified":
              // Task updated
              this.$store.commit("MODIFY_TASK", task);
              return;
            case "removed":
              // Task deleted
              this.$store.commit("DELETE_TASK", change.doc.id);
              break;
          }
        });
        this.loading = false;
      });
  },
  data() {
    return {
      tasks: [],
      selectedTask: [],
      done: false,
      dialog: false,
      active: false,
      radios: ''
    };
  },
  mounted() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      this.$store.getters.database
        .collection("tasks")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.tasks.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
            });
          });
        });
    },
    editTask(id) {
      this.selectedTask = [];
      this.dialog = true;
      let task = this.$store.getters.database.collection("tasks").doc(id).get();
      task.then((doc) => {
        this.selectedTask.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
        });
        console.log(this.selectedTask.title);
      });
    },
    updateTask(id) {
      let task = this.$store.getters.database.collection("tasks").doc(id)
      task.set({
          status: this.radios,
          title: this.$refs.title[0].value,
          description: this.$refs.description[0].value,
        })
        .then(() => {
          this.dialog = false
          Toastr.success("Task updated successfully!");
          console.log(this.radios)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTask(id) {
      if (window.confirm("Do you want to delete this task?")) {
        this.$store.getters.database
          .collection("tasks")
          .doc(id)
          .delete()
          .then(() => {
            this.tasks = this.tasks.filter((item) => item.id !== id);
            this.dialog = false;
            Toastr.warning("Task deleted!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>