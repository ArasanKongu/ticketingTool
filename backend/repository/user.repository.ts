import { User } from '../models/user.model';

class UserRepository {
    private users: User[] = [];

    async retrieve(filter: Partial<User>): Promise<User | undefined> {
        return this.users.find(user => user.email === filter.email && user.status === filter.status);
    }

    async save(user: User): Promise<User> {
        user.id = this.users.length + 1; // Simulating an auto-increment ID
        user.status = 0; // Default status
        this.users.push(user);
        return user;
    }
}

export const userRepository = new UserRepository();
