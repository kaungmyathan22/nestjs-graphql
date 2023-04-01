import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/inputs/create-user.input";
import { DeleteUserInput } from "./dto/inputs/delete-user.input";
import { UpdateUserInput } from "./dto/inputs/update-user.input";
import { User } from "./models/user";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly usersService: UsersService) { }

    @Query(() => User, { nullable: true, name: 'user' })
    public getUser (@Args() getUserArgs: GetUserArgs): User {
        return this.usersService.getUser(getUserArgs);
    }

    @Query(() => [User], { nullable: "items", name: 'users' })
    public getUsers (@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.usersService.getUsers(getUsersArgs);
    }

    @Mutation(() => User)
    public deleteUser (@Args("deleteUserData") deleteUserData: DeleteUserInput): User {
        return this.usersService.deleteUser(deleteUserData)
    }

    @Mutation(() => User)
    public createUser (@Args("createUserData") createUserData: CreateUserInput): User {
        return this.usersService.createUser(createUserData);
    }

    @Mutation(() => User)
    public updateUser (@Args("updateUserData") updateUserData: UpdateUserInput): User {
        return this.usersService.updateUser(updateUserData);
    }
}