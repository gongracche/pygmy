<template>
    <div v-if="isCreate">
        <h5>User create</h5>
        <div class="form-group">
             <label>name</label>
             <input v-model="createUser.name" class="form-control mb-3"/>
             <label>email</label>
             <input v-model="createUser.email" class="form-control mb-3"/>
        </div>
        <button @click="createCancel" class="btn btn-secondary me-2">Cancel</button>
        <button @click="createSave" class="btn btn-primary">Save</button>
    </div>
    <div v-else-if="isEdit">
        <div v-if="editUser">
            <h5>User edit</h5>
            <div class="form-group">
                <label>id</label>
                <p class="form-control">{{ currentUser.id }}</p>
                <label>name</label>
                <input v-model="editUser.name" class="form-control mb-3"/>
                <label>email</label>
                <input v-model="editUser.email" class="form-control mb-3"/>
                <label>created at</label>
                <p class="form-control">{{ moment(editUser.createdAt) }}</p>
                <label>updated at</label>
                <p class="form-control">{{ moment(editUser.updatedAt) }}</p>
            </div>
            <button @click="editCancel" class="btn btn-secondary me-2">Cancel</button>
            <button @click="editSave" class="btn btn-primary">Save</button>
        </div>
    </div>
    <div v-else>
        <div v-if="currentUser">
            <h5>User info</h5>
            <div class="form-group">
                <label>id</label>
                <p class="form-control">{{ currentUser.id }}</p>
                <label>name</label>
                <p class="form-control">{{ currentUser.name }}</p>
                <label>email</label>
                <p class="form-control">{{ currentUser.email }}</p>
                <label>created at</label>
                <p class="form-control">{{ moment(currentUser.createdAt) }}</p>
                <label>updated at</label>
                <p class="form-control">{{ moment(currentUser.updatedAt) }}</p>
            </div>
            <button @click="goUsers" class="btn btn-primary me-2">Users</button>
            <button @click="editStart" class="btn btn-secondary me-2">Edit</button>
            <button @click="deleteData" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import UserService from '../services/UserService';

export default {
    name: "user",
    data() {
        return {
            currentUser: null,
            message: '',
            isEdit: false,
            editUser: null,
            isCreate: false,
            createUser: null
        }
    },
    methods: {
        getUser(id) {
            UserService.get(id)
            .then(response => {
                this.currentUser = response.data;
            })
        },

        goUsers() {
            this.$router.push({ name: "users" });
        },

        editStart() {
            UserService.get(this.$route.params.id)
            .then(response => {
                console.log(response);
                this.editUser = response.data;
                this.isEdit = true;
            })
        },

        editSave() {
            var user = this.editUser;
            UserService.update(user)
            .then(response => {
                this.currentUser = this.editUser;
                this.editUser = null;
                this.isEdit = false;
            })
        },

        editCancel() {
            this.editUser = null;
            this.isEdit = false;
        },

        createSave() {
            var user = this.createUser;
            UserService.create(user)
            .then(response => {
                this.$router.push({ name: "users" });
            })
        },

        createCancel() {
            this.$router.push({ name: "users" })
        },

        deleteData() {
            UserService.delete(this.currentUser.id)
            .then(response=> {
                this.$router.push({ name: "users"});
            })
        },

        moment (date) {
          return moment(date).format("YYYY/MM/DD HH:mm:ss");
        }
    },
    mounted() {
        const id = this.$route.params.id;
        if (id === 'new') {
            console.log('new');
            this.isCreate = true;
            this.createUser = {
                name: null,
                email: null
            };
        } else {
            this.getUser(id);
            this.isEdit = false;
            this.editUser = null;
        }
        
    }
}
</script>