import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { PostEntity } from './post.entity';

@Entity('likes')
@Unique(['postId', 'userId'])
export class LikeEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Column({ name: 'post_id' })
	postId!: number;

	@ManyToOne(() => PostEntity, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'post_id' })
	post!: PostEntity;

	@ApiProperty()
	@Column({ name: 'user_id' })
	userId!: number;

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	user!: User;

	@ApiProperty()
	@CreateDateColumn({ name: 'created_at' })
	createdAt!: Date;
}

