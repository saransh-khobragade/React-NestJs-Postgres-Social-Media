import {
	Controller,
	Get,
	Post,
	UseGuards,
	Req,
	UploadedFile,
	UseInterceptors,
	Body,
	Param,
	ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Express } from 'express';
import { extname } from 'path';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

function editFileName(_: unknown, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
	const fileExtName = extname(file.originalname);
	const randomName = Array.from({ length: 16 }, () => Math.round(Math.random() * 16).toString(16)).join('');
	callback(null, `${randomName}${fileExtName}`);
}

@ApiTags('posts')
@Controller('api')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get('posts')
	async getFeed() {
		const data = await this.postsService.getFeed();
		return { success: true, data };
	}

	@Get('users/:id/posts')
	async getUserPosts(@Param('id', ParseIntPipe) id: number) {
		const data = await this.postsService.getUserPosts(id);
		return { success: true, data };
	}

	@Post('posts')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './uploads',
				filename: editFileName,
			}),
		}),
	)
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				caption: { type: 'string' },
				image: { type: 'string', format: 'binary' },
			},
		},
	})
	async createPost(
		@Req() req: { user: { sub: number } },
		@UploadedFile() file: Express.Multer.File,
		@Body() body: CreatePostDto,
	) {
		const imageUrl = `/uploads/${file.filename}`;
		const caption = body.caption ?? null;
		const data = await this.postsService.createPost(req.user.sub, imageUrl, caption);
		return { success: true, data };
	}

	@Post('posts/:id/like')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async likePost(@Param('id', ParseIntPipe) id: number, @Req() req: { user: { sub: number } }) {
		const data = await this.postsService.likePost(id, req.user.sub);
		return { success: true, data };
	}
}

