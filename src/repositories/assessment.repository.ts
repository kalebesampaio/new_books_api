import { AppDataSource } from "../data-source";
import { Assessment } from "../entities/assessment.entity";

export default AppDataSource.getRepository(Assessment);
