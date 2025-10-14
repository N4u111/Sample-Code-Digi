"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, age, password, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(id, name, email, age, password) {
        const now = new Date();
        return new User(id, name, email, age, password, now, now);
    }
    updateName(name) {
        return new User(this.id, name, this.email, this.age, this.password, this.createdAt, new Date());
    }
    updateEmail(email) {
        return new User(this.id, this.name, email, this.age, this.password, this.createdAt, new Date());
    }
    updateAge(age) {
        return new User(this.id, this.name, this.email, age, this.password, this.createdAt, new Date());
    }
    updatePassword(password) {
        return new User(this.id, this.name, this.email, this.age, password, this.createdAt, new Date());
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            age: this.age,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map