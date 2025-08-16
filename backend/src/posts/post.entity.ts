import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('posts')
export class PostEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty({ description: 'Owner user id' })
	@Column({ name: 'user_id' })
	userId!: number;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user!: User;

	@ApiProperty({ description: 'Public URL to the stored image' })
	@Column({ name: 'image_url', type: 'varchar', length: 1024 })
	imageUrl!: string;

	@ApiProperty({ description: 'Caption for the post', required: false })
	@Column({ type: 'text', nullable: true })
	caption!: string | null;

	@ApiProperty()
	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;
}

