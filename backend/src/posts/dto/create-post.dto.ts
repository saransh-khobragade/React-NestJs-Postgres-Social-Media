import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
	@ApiProperty({ description: 'Caption for the image', maxLength: 2000, required: false })
	@IsOptional()
	@IsString()
	@MaxLength(2000)
	caption?: string;
}

