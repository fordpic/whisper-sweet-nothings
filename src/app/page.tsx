'use client';
import { useState } from 'react';

export default function Home() {
	const [theFile, setTheFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [response, setResponse] = useState('');

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget.files?.[0];
		if (!file) return;

		setTheFile(file);
	};

	const callGetTranscription = async () => {
		setIsLoading(true);

		// Handle cases for no file selected
		if (!theFile) {
			setIsLoading(false);
			return;
		}

		const formData = new FormData();
		formData.set('file', theFile);

		try {
			const response = await fetch('/api', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				console.log('File uploaded successfully!');
			} else {
				console.error('Failed to upload file.');
			}

			const data = await response.json();
			setResponse(data.output.text);
		} catch (err) {
			console.error('An error occurred while uploading the file', err);
		}

		// Clear
		setTheFile(null);
		setIsLoading(false);
	};

	return <div>yewww</div>;
}
