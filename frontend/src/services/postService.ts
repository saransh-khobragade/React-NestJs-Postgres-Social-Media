import { api } from './api';

export interface PostDto {
	id: number;
	userId: number;
	imageUrl: string;
	caption: string | null;
	createdAt: string;
}

export interface LikeResult {
	liked: boolean;
	total: number;
}

interface ApiResponse<T> {
	success: boolean;
	data: T;
}

export const postService = {
	getFeed: async (): Promise<PostDto[]> => {
		const res = await api.get<ApiResponse<PostDto[]>>('/api/posts');
		return res.data;
	},
	getUserPosts: async (userId: string | number): Promise<PostDto[]> => {
		const res = await api.get<ApiResponse<PostDto[]>>(`/api/users/${userId}/posts`);
		return res.data;
	},
	uploadPost: async (file: File, caption?: string): Promise<PostDto> => {
		const formData = new FormData();
		formData.append('image', file);
		if (caption) formData.append('caption', caption);

		const response = await fetch(`${(import.meta.env['VITE_API_URL'] as string) ?? 'http://localhost:8080'}/api/posts`, {
			method: 'POST',
			headers: {
				...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}),
			},
			body: formData,
		});
		if (!response.ok) throw new Error('Upload failed');
		const json = (await response.json()) as ApiResponse<PostDto>;
		return json.data;
	},
	likePost: async (postId: number): Promise<LikeResult> => {
		const res = await api.post<ApiResponse<LikeResult>>(`/api/posts/${postId}/like`, {});
		return res.data;
	},
};

