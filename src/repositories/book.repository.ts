import { AppDataSource } from "../data-source";
import { Book } from "../entities/book.entity";

export default AppDataSource.getRepository(Book);
