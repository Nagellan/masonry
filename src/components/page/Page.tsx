import { memo } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from '@/components/error/ErrorBoundary';

import { PageError } from './PageError';

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

type Props = {
	children: ReactNode;
};

export const Page = memo(({ children }: Props) => {
	return (
		<Wrapper>
			<ErrorBoundary fallback={<PageError />}>{children}</ErrorBoundary>
		</Wrapper>
	);
});
