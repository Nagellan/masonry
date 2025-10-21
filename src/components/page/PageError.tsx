import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/Button';

import { PageStatus } from './PageStatus';

export const PageError = () => {
	const navigate = useNavigate();

	const onClick = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<PageStatus
			title="Page crashed!"
			description="Something went wrong. Please, refresh page or navigate to homepage."
			action={<Button onClick={onClick}>Go home</Button>}
		/>
	);
};
