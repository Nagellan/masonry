import { useCallback } from 'react';

import { Button } from '@/components/ui/Button';

import { PageStatus } from './PageStatus';

export const PageError = () => {
	const onClick = useCallback(() => {
		window.location.reload();
	}, []);

	return (
		<PageStatus
			title="Page crashed!"
			description="Something went wrong. Please, try reloading page."
			action={<Button onClick={onClick}>Reload</Button>}
		/>
	);
};
