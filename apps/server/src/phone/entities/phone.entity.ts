import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Phone {
	@PrimaryGeneratedColumn('uuid')
    id: string;

	@Column()
	brand: string;

	@Column()
    model: string;

	@Column()
    price: string;
}
