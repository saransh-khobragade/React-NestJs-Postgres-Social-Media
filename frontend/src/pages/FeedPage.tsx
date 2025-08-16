import React, { useEffect, useState } from 'react';
import { postService, type PostDto } from '@/services/postService';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';

export const FeedPage: React.FC = () => {
	const [posts, setPosts] = useState<PostDto[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		postService.getFeed().then(setPosts).finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<Navbar />
			<main className='container mx-auto px-4 py-6'>
				<h1 className='text-2xl font-semibold mb-4'>Feed</h1>
				{loading ? (
					<div>Loading...</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{posts.map((p) => (
							<div key={p.id} className='border rounded-lg overflow-hidden bg-card'>
								<img src={p.imageUrl} alt={p.caption ?? ''} className='w-full h-64 object-cover' />
								<div className='p-3 space-y-2'>
									<div className='text-sm text-muted-foreground'>{new Date(p.createdAt).toLocaleString()}</div>
									<div className='text-base'>{p.caption}</div>
									<Button variant='outline' onClick={async () => {
										await postService.likePost(p.id);
										setPosts(await postService.getFeed());
									}}>
										Like
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
};

