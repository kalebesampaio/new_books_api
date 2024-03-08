import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Assessment } from "./assessment.entity";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 125 })
  title: string;

  @Column({ length: 125 })
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column("simple-array")
  genres: string[];

  @Column({ length: 125 })
  type: string;

  @Column()
  cover: string;

  @Column()
  views: number;

  @Column({ length: 10 })
  launched_in: string;

  @Column({ length: 60 })
  status: string;

  @Column({ default: "true" })
  isActive: boolean;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Comment, (comments) => comments.book, {
    eager: true,
  })
  comments: Comment[];

  @OneToMany(() => Assessment, (assessments) => assessments.book, {
    eager: true,
  })
  assessments: Assessment[];
}
