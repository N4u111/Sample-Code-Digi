export declare class User {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly age: number;
    readonly password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, email: string, age: number, password: string, createdAt: Date, updatedAt: Date);
    static create(id: string, name: string, email: string, age: number, password: string): User;
    updateName(name: string): User;
    updateEmail(email: string): User;
    updateAge(age: number): User;
    updatePassword(password: string): User;
    toJSON(): {
        id: string;
        name: string;
        email: string;
        age: number;
        createdAt: Date;
        updatedAt: Date;
    };
}
