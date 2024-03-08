import {
  UserCreate,
  UserRead,
  UserReturn,
  UserUpdate,
} from "../interfaces/index";
import userRepository from "../repositories/user.repository";
import { userReadSchema, userReturnSchema } from "../schemas";
import { AppError } from "../errors/AppError";
import { User } from "../entities/user.entity";

export class userServices {
  create = async (userData: UserCreate): Promise<UserReturn> => {
    const user: User = userRepository.create({
      ...userData,
    });

    await userRepository.save(user);

    return userReturnSchema.parse(user);
  };

  get = async (admin: boolean): Promise<UserRead> => {
    if (admin) {
      const users: Array<User> = await userRepository.find({
        withDeleted: true,
      });
      return userReadSchema.parse(users);
    }
    return userReadSchema.parse(await userRepository.find());
  };

  retrieve = async (id: string): Promise<UserReturn> => {
    return userReturnSchema.parse(
      await userRepository.findOne({
        where: { id },
      })
    );
  };

  update = async (id: string, userData: UserUpdate): Promise<UserReturn> => {
    if (userData.id) {
      throw new AppError(
        401,
        "Field id, createdAt, updatedAt  n cannot be changed"
      );
    }
    if (userData.updatedAt) {
      throw new AppError(
        401,
        "Field id, createdAt, updatedAt  n cannot be changed"
      );
    }
    if (userData.createdAt) {
      throw new AppError(
        401,
        "Field id, createdAt, updatedAt  n cannot be changed"
      );
    }
    await userRepository.update(id, { ...userData });
    return userReturnSchema.parse(
      await userRepository.findOne({
        where: { id },
      })
    );
  };

  destroy = async (user: User): Promise<void> => {
    await userRepository.softRemove(user);
  };
}
