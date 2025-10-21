import type { ReactNode } from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from '@/components/error/ErrorBoundary';

import { PageError } from './PageError';
import { PageFooter } from './PageFooter';

const Wrapper = styled.div`
	height: 100vh;
`;

type Props = {
	children: ReactNode;
};

export const Page = ({ children }: Props) => {
	return (
		<Wrapper>
			<ErrorBoundary fallback={<PageError />}>{children}</ErrorBoundary>
			<PageFooter />
		</Wrapper>
	);
};
