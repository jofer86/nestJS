import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(
      `USER: ${this.id} CREATE`,
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      `USER: ${this.id} UPDATE`,
    );
  }

  @AfterRemove()
  logRemove() {
    console.log(
      `USER: ${this.id} DESTROY`,
    );
  }
}
