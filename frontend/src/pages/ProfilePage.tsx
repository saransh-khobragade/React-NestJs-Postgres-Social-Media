import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { postService, type PostDto } from '@/services/postService';
import { useAuth } from '@/contexts/AuthContext';

export const ProfilePage: React.FC = () => {
	const { user } = useAuth();
	const [posts, setPosts] = useState<PostDto[]>([]);

	useEffect(() => {
		if (!user) return;
		postService.getUserPosts(user.id).then(setPosts);
	}, [user]);

	return (
		<div>
			<Navbar />
			<main className='container mx-auto px-4 py-6'>
				<h1 className='text-2xl font-semibold mb-4'>My Posts</h1>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
					{posts.map((p) => (
						<img key={p.id} src={p.imageUrl} alt={p.caption ?? ''} className='w-full h-48 object-cover rounded-md' />
					))}
				</div>
			</main>
		</div>
	);
};

