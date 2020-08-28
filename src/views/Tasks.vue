<template>
  <v-app>
    <NavBar />
    <v-main>
      <div class="d-flex justify-center align-center my-5 py-5 layout">
        <v-container fluid class="align-center justify-center">
          <h1 class="text-center">My tasks</h1>

          <div
            class="justify-center align-center my-5"
            v-for="(task, i) in getAllTasks"
            :key="`task-${i}`"
          >
            <v-row class="justify-center align-center mx-5">
              <v-col class="d-flex" md="5" lg="5" sm="8">
                <v-col cols-md="2">
                  <v-checkbox :label="`Done`" @click="updateStatus(task.id,task.status)" :input-value="task.status"></v-checkbox>
                </v-col>
                <v-col cols-md="6" class="justify-center align-center">
                  <p
                    :class="{'text-decoration-line-through text-center': task.status}"
                    class="title text-center"
                  >{{task.title}}</p>
                  <p
                    :class="{'text-decoration-line-through text-center': task.status}"
                    class="text-sm-body-2 text-center"
                  >{{task.description}}</p>
                </v-col>
                <v-col cols="2">
                  <v-btn icon @click="editTask(task.id)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <v-btn icon @click="deleteTask(task.id)">
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </div>
      <v-dialog v-model="dialog" width="500" v-for="tsk in selectedTask" :key="tsk.id">
        <v-card>
          <v-card-title class="headline grey lighten-2">Update task</v-card-title>

          <v-form class="px-5 py-5">
            <v-text-field v-model="title" :placeholder="tsk.title"></v-text-field>
            <v-text-field v-model="description" :placeholder="tsk.description"></v-text-field>
            <div class="d-flex">
              <v-radio-group v-model="radios" :mandatory="false">
                <v-radio label="In progress" :value="false"></v-radio>
                <v-radio label="Done" :value="true"></v-radio>
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
import { mapGetters } from "vuex";

export default {
  name: "Tasks",
  components: {
    NavBar,
    BottomNav,
  },
  data() {
    return {
      tasks: [],
      selectedTask: [],
      title: "",
      description: "",
      done: false,
      dialog: false,
      active: false,
      radios: false,
    };
  },
  mounted() {
    if (this.getAllTasks < 1) {
      this.$store.dispatch("getListenerRealTime");
    }
  },
  computed: {
    ...mapGetters({
      getAllTasks: "tasks",
    }),
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasks").then((arrayDocs) => {
        arrayDocs.forEach((doc) => {
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
      this.$store
        .dispatch("editTask", { id })
        .then((doc) => {
          this.selectedTask.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateTask(id) {
      this.dialog = false;
      this.$store
        .dispatch("updateTask", {
          id: id,
          title: this.title,
          description: this.description,
          status: this.radios,
        })
        .then(() => {
          Toastr.success("Task updated successfully", "Task updated", {
            timeOut: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateStatus(id,status) {
      this.$store
        .dispatch("updateStatus", { done: !status, id })
        .then(() =>
          Toastr.success("Task updated successfully", "Task updated", {
            timeOut: 2000,
          })
        );
    },
    deleteTask(id) {
      if (window.confirm("Do you want to delete this task?")) {
        this.$store.getters.database
          .collection("tasks")
          .doc(id)
          .delete()
          .then(() => {
            Toastr.error("Task deleted successfully!", "Task deleted", {
              timeOut: 2000,
            });
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