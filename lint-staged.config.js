export default {
	'*.{ts,tsx}': () => 'tsc -b',
	'**/*': ['eslint', 'prettier --write'],
};
