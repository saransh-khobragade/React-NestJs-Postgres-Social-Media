import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { postService } from '@/services/postService';

export const UploadPage: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [caption, setCaption] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;
		setSubmitting(true);
		try {
			await postService.uploadPost(file, caption);
			window.location.href = '/insta';
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<Navbar />
			<main className='container mx-auto px-4 py-6 max-w-md'>
				<h1 className='text-2xl font-semibold mb-4'>Upload Post</h1>
				<form onSubmit={onSubmit} className='space-y-4'>
					<Input type='file' accept='image/*' onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
					<Input placeholder='Caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
					<Button type='submit' disabled={!file || submitting}>Upload</Button>
				</form>
			</main>
		</div>
	);
};

