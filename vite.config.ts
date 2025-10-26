/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	base: '/masonry/',
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
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/spec/setupTests.ts',
		include: ['**/spec/**/*.spec.{ts,tsx}'],
	},
});
