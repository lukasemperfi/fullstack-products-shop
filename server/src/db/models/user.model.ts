import { Model } from "objection";

import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { BaseModel } from "./base-model.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";
import { UserRoleDto } from "../../dtos/user/user-role.dto";
import { UserDto } from "../../dtos/user/user.dto";

export class User extends BaseModel {
  static tableName = "user";

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  avatar: string | null;

  static relationMappings = {
    reaction: {
      relation: Model.HasOneRelation,
      modelClass: "reaction.model",
      join: {
        from: "user.id",
        to: "reaction.user_id",
      },
    },
    role: {
      relation: Model.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: "user.id",
        through: {
          from: "user_role.user_id",
          to: "user_role.role_id",
        },
        to: "role.id",
      },
    },
    user_role: {
      relation: Model.HasManyRelation,
      modelClass: UserRole,
      join: {
        from: "user.id",
        to: "user_role.user_id",
      },
    },
  };

  static async getUsers(): Promise<UserDto[]> {
    const users = await User.query()
      .withGraphFetched("role as roles")
      .modifyGraph("roles", (builder) => {
        builder.select("role", "id");
      });

    return users;
  }

  static async deleteUser(user_id: number): Promise<void> {
    await User.query().deleteById(user_id);
  }

  static async getRoles() {
    const roles = await Role.query().select("id", "role");

    return roles;
  }

  static async updateRoles(roles: UserRoleDto, user_id: string): Promise<void> {
    await UserRole.query().delete().where("user_id", user_id);

    const userRoles = await Role.query().whereIn("id", roles);

    for (const key in userRoles) {
      const role = userRoles[key];

      await UserRole.query().insert({
        user_id: parseInt(user_id, 10),
        role_id: role.id,
      });
    }
  }

  static async createUser(
    newUser: CreateUserDto
  ): Promise<UserDto | undefined> {
    const userRole = await Role.query()
      .findOne("role", "=", "user")
      .select("id");

    const createdUser = await User.query().insertAndFetch({ ...newUser });

    await UserRole.query().insert({
      user_id: createdUser.id,
      role_id: userRole?.id,
    });

    const user = await User.getUserById(createdUser.id);

    return user;
  }

  static async updateUser(
    newUser: Partial<CreateUserDto>,
    user_id: string
  ): Promise<void> {
    await User.query()
      .findById(user_id)
      .patch({ ...newUser });
  }

  static async getUserById(user_id: number): Promise<UserDto> {
    const user = await User.query()
      .withGraphFetched("role as roles")
      .modifyGraph("roles", (builder) => {
        builder.select("role");
      })
      .findById(user_id);

    return user as UserDto;
  }
}
