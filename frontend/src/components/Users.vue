<template>
  <div>Users</div>
  <div>
    <table>
      <tr>
        <th>No</th>
        <th>id</th>
        <th>name</th>
        <th>created at</th>
        <th>updated at</th>
        <th></th>
      </tr>
      <tr
        v-for="(user, index) in users"
        :key="index"
        @click="setActiveUser(user, index)"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.createdAt }}</td>
        <td>{{ user.updatedAt }}</td>
        <td>
          <router-link :to="/users/ + user.id">View</router-link>
        </td>
      </tr>
    </table>
  </div>
  <button @click="createUser">New</button>
</template>

<script>
import { RouterLink } from 'vue-router';
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
        }
    },
    mounted() {
        this.retriveUsers();
    },
    components: { RouterLink }
}
</script>
