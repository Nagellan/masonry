import type { ReactNode } from 'react';
import styled from 'styled-components';

import { Bubble } from '@/components/ui/Bubble';

const Header = styled.header`
	height: 52px;
`;

const Actions = styled(Bubble)`
	padding: 4px;
	display: flex;
	flex-direction: row;
	gap: 4px;
`;

const LeftActions = styled(Actions)`
	position: fixed;
	top: 4px;
	left: 4px;
`;

const RightActions = styled(Actions)`
	position: fixed;
	top: 4px;
	right: 4px;
`;

const Title = styled(Bubble)`
	position: fixed;
	top: 4px;
	left: 50%;
	transform: translateX(-50%);

	font-size: 16px;
	line-height: 16px;
	padding: 14px 16px;

	z-index: 1;
`;

type Props = {
	left?: ReactNode;
	title: ReactNode;
	right?: ReactNode;
};

export const PageHeader = ({ left, title, right }: Props) => {
	return (
		<Header>
			{left && <LeftActions>{left}</LeftActions>}
			<Title>{title}</Title>
			{right && <RightActions>{right}</RightActions>}
		</Header>
	);
};
