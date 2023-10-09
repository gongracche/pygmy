<template>
  <h5>Users</h5>
  <div>
    <table class="table table-bordered">
      <thead>
        <th scope="col">#</th>
        <th scope="col">id</th>
        <th scope="col">name</th>
        <th scope="col">email</th>
        <th scope="col">created at</th>
        <th scope="col">updated at</th>
        <th scope="col">action</th>
      </thead>
      <tr
        v-for="(user, index) in users"
        :key="index"
        @click="setActiveUser(user, index)"
      >
        <td scope="row" class="pe-2">{{ index + 1 }}</td>
        <td class="pe-2">{{ user.id }}</td>
        <td class="pe-2">{{ user.name }}</td>
        <td class="pe-2">{{ user.email }}</td>
        <td class="pe-2">{{ moment(user.createdAt) }}</td>
        <td class="pe-2">{{ moment(user.updatedAt) }}</td>
        <td class="pt-2 pb-2">
          <router-link :to="/users/ + user.id" class="bi bi-file-text"></router-link>
        </td>
      </tr>
    </table>
  </div>
  <button tyep="button" class="btn btn-primary" @click="createUser">Create</button>
</template>

<script>
import { RouterLink } from 'vue-router';
import moment from 'moment';
import UserService from '../services/UserService';

export default {
    name: "users",
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1
        };
    },
    methods: {
        retriveUsers() {
            console.log("retriveUsers called.");
            UserService.getAll()
                .then(response => {
                this.users = response.data;
            })
                .catch(e => {
                console.error(e);
            });
        },
        setActiveUser(user, index) {
            this.currentUser = user;
            this.currentIndex = user ? index : -1;
        },
        refreshList() {
            this.retriveUsers();
            this.currentUser = null;
            this.currentIndex = -1;
        },
        createUser() {
            this.$router.push("/users/new");
        },
        moment (date) {
          return moment(date).format("YYYY/MM/DD HH:mm:ss");
        }
    },
    mounted() {
        this.retriveUsers();
    },
    components: { RouterLink }
}
</script>
