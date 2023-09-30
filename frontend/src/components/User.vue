<template>
    <div v-if="isCreate">
        <div>User create</div>
        <div>
            <table>
            <tr>
                <th>name</th>
                <td><input v-model="createUser.name"/></td>
            </tr>
            </table>
        </div>
        <button @click="createCancel">Cancel</button>
        <button @click="createSave">Save</button>
    </div>
    <div v-else-if="isEdit">
        <div v-if="editUser">
            <div>User edit</div>
            <div>
                <table>
                <tr>
                    <th>id</th>
                    <td>{{ currentUser.id }}</td>
                </tr>
                <tr>
                    <th>name</th>
                    <td><input v-model="editUser.name"/></td>
                </tr>
                <tr>
                    <th>created at</th>
                    <td>{{ editUser.createdAt }}</td>
                </tr>
                <tr>
                    <th>updated at</th>
                    <td>{{ editUser.updatedAt }}</td>
                </tr>
                </table>
            </div>
            <button @click="editCancel">Cancel</button>
            <button @click="editSave">Save</button>
        </div>
    </div>
    <div v-else>
        <div v-if="currentUser">
            <div>User info</div>
            <div>
                <table>
                <tr>
                    <th>id</th>
                    <td>{{ currentUser.id }}</td>
                </tr>
                <tr>
                    <th>name</th>
                    <td>{{ currentUser.name }}</td>
                </tr>
                <tr>
                    <th>created at</th>
                    <td>{{ currentUser.createdAt }}</td>
                </tr>
                <tr>
                    <th>updated at</th>
                    <td>{{ currentUser.updatedAt }}</td>
                </tr>
                </table>
            </div>
            <button @click="goList">List</button>
            <button @click="editStart">Edit</button>
            <button @click="deleteData">Delete</button>
        </div>
    </div>
</template>
<script>
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

        goList() {
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
        }
    },
    mounted() {
        const id = this.$route.params.id;
        if (id === 'new') {
            console.log('new');
            this.isCreate = true;
            this.createUser = { name: null };
        } else {
            this.getUser(id);
            this.isEdit = false;
            this.editUser = null;
        }
        
    }
}
</script>