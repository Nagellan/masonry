import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { Page } from '@/components/page/Page';
import { PageHeader } from '@/components/page/PageHeader';
import { PageFooter } from '@/components/page/PageFooter';

import { Content } from './Content';
import { Button } from '@/components/ui/Button';

export const Photo = () => {
	const navigate = useNavigate();

	const goBack = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<Page>
			<PageHeader
				title="Photo"
				left={<Button onClick={goBack}>Back</Button>}
			/>
			<Content />
			<PageFooter />
		</Page>
	);
};
