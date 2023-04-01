import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/inputs/create-user.input";
import { DeleteUserInput } from "./dto/inputs/delete-user.input";
import { UpdateUserInput } from "./dto/inputs/update-user.input";
import { User } from "./models/user";

@Injectable()
export class UsersService {

    private users: User[] = [];

    public createUser (createUserData: CreateUserInput): User {
        const user: User = {
            userId: uuidv4(),
            ...createUserData,
        }
        this.users.push(user);
        return user;
    }

    public updateUser (updateUserData: UpdateUserInput): User {
        const user = this.users.find(user => user.userId === updateUserData.userId);
        Object.assign(user, { ...updateUserData });
        this.users.push(user);
        return user;
    }

    public getUser (getUserArgs: GetUserArgs): User {
        return this.users.find(user => getUserArgs.userId === user.userId);
    }

    public getUsers (getUsersArgs: GetUsersArgs): User[] {
        return this.users.filter(user => getUsersArgs.userIds.includes(user.userId));
    }

    public deleteUser (deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId);
        const user = this.users[userIndex];
        this.users.splice(userIndex, 1);
        return user;
    }
}
