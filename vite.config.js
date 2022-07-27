import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	optimizeDeps: { include: ['firebase/app', 'firebase/firestore'] },
	plugins: [sveltekit()]
};

export default config;
