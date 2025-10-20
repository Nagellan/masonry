import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				env: {
					development: {
						plugins: [
							[
								'babel-plugin-styled-components',
								{
									ssr: false,
									displayName: true,
									fileName: true,
									minify: false,
									transpileTemplateLiterals: false,
									pure: false,
								},
							],
						],
					},
					production: {
						plugins: [
							[
								'babel-plugin-styled-components',
								{
									ssr: false,
									displayName: false,
									fileName: false,
									minify: true,
									transpileTemplateLiterals: true,
									pure: true,
								},
							],
						],
					},
				},
			},
		}),
	],
});
