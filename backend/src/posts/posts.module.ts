import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { LikeEntity } from './like.entity';

@Module({
	imports: [TypeOrmModule.forFeature([PostEntity, LikeEntity])],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}

