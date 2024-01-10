import backend from '../backend'

class UserService {
    getAll() {
        return backend.get("/users");
    }

    get(id) {
        return backend.get("/users/" + id);
    }

    create(data) {
        return backend.post("/users", data);
    }

    update(data) {
        return backend.put("/users/" + data.id, data);
    }

    delete(id) {
        return backend.delete("/users/" + id);
    }
}

export default new UserService()
