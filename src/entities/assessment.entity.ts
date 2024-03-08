import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity("assessments")
export class Assessment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.assessments)
  user: User;

  @ManyToOne(() => Book, (book) => book.assessments)
  book: Book;
}
