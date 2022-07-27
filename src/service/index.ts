import { addDoc, serverTimestamp, linkCollection, getDocs, query, where } from '../config/index';

export async function createShortUrl({
	shortString,
	originalUrl
}: {
	shortString: string;
	originalUrl: string;
}) {
	const post = await addDoc(linkCollection, {
		short_string: shortString,
		original_url: originalUrl,
		created_at: serverTimestamp(),
		id: `${+new Date()}:${shortString}`
	});

	return post;
}

export async function getShortUrl({ shortString }: { shortString: string }) {
	const q = query(linkCollection, where('short_string', '==', shortString));
	const get = await getDocs(q);

	return get;
}
