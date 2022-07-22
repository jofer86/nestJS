import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  mileage: number;

  @Column()
  year: number;

  @Column()
  price: number;
}
