import { AppDataSource } from "../data-source";
import { Comment } from "../entities/comment.entity";

export default AppDataSource.getRepository(Comment);
