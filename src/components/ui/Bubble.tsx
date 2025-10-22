import { memo } from 'react';
import type { HTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: inline;
	flex-shrink: 0;

	padding: 10px 12px;
	border-radius: 20px;

	background-color: #ffffff80;
	backdrop-filter: blur(10px);
`;

export const Bubble = memo((props: HTMLAttributes<HTMLDivElement>) => {
	return <Wrapper {...props} />;
});
