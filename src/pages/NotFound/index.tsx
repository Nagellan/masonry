import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Page } from '@/components/page/Page';
import { PageStatus } from '@/components/page/PageStatus';
import { Button } from '@/components/ui/Button';

export const NotFound = () => {
	const navigate = useNavigate();

	const onClick = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<Page>
			<PageStatus
				title="ERROR: 404"
				description="Page not found."
				action={<Button onClick={onClick}>Go home</Button>}
			/>
		</Page>
	);
};
