import { memo } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { Bubble } from '@/components/ui/Bubble';

const Header = styled.header`
	position: fixed;
	top: 0px;
	left: 0;
	right: 0;
	padding: 4px;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 4px;

	z-index: 2;
`;

const Actions = styled(Bubble)`
	padding: 4px;
	display: flex;
	flex-direction: row;
	gap: 4px;
`;

const LeftActions = styled(Actions)`
	margin-right: auto;
`;

const RightActions = styled(Actions)`
	margin-left: auto;
`;

const Title = styled(Bubble)`
	font-size: 16px;
	line-height: 16px;
	padding: 14px 16px;
	margin: auto;
`;

type Props = {
	left?: ReactNode;
	title: ReactNode;
	right?: ReactNode;
};

export const PageHeader = memo(({ left, title, right }: Props) => {
	return (
		<Header>
			{left ? (
				<LeftActions>{left}</LeftActions>
			) : (
				<div style={{ marginRight: 'auto' }} />
			)}
			<Title>{title}</Title>
			{right ? (
				<RightActions>{right}</RightActions>
			) : (
				<div style={{ marginLeft: 'auto' }} />
			)}
		</Header>
	);
});
