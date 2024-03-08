import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";
import { Book } from "./book.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 240 })
  text: string;

  @CreateDateColumn()
  created_at: Date | string;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => Book, (book) => book.comments)
  book: Book;
}
