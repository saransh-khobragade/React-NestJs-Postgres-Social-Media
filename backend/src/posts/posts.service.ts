import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { LikeEntity } from './like.entity';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(PostEntity) private readonly postRepo: Repository<PostEntity>,
		@InjectRepository(LikeEntity) private readonly likeRepo: Repository<LikeEntity>,
	) {}

	async getFeed(): Promise<PostEntity[]> {
		return this.postRepo.find({ order: { createdAt: 'DESC' } });
	}

	async getUserPosts(userId: number): Promise<PostEntity[]> {
		return this.postRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
	}

	async createPost(userId: number, imageUrl: string, caption: string | null): Promise<PostEntity> {
		const post = this.postRepo.create({ userId, imageUrl, caption: caption ?? null });
		return this.postRepo.save(post);
	}

	async likePost(postId: number, userId: number): Promise<{ liked: boolean; total: number }> {
		const post = await this.postRepo.findOne({ where: { id: postId } });
		if (!post) throw new NotFoundException('Post not found');

		const existing = await this.likeRepo.findOne({ where: { postId, userId } });
		if (existing) {
			await this.likeRepo.remove(existing);
		} else {
			await this.likeRepo.save(this.likeRepo.create({ postId, userId }));
		}

		const total = await this.likeRepo.count({ where: { postId } });
		const liked = await this.likeRepo.exist({ where: { postId, userId } });
		return { liked, total };
	}
}

