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
	justify-content: space-between;
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

const Title = styled(Bubble)`
	font-size: 16px;
	line-height: 16px;
	padding: 14px 16px;
`;

type Props = {
	left?: ReactNode;
	title: ReactNode;
	right?: ReactNode;
};

export const PageHeader = ({ left, title, right }: Props) => {
	return (
		<Header>
			{left ? <Actions>{left}</Actions> : <div />}
			<Title>{title}</Title>
			{right ? <Actions>{right}</Actions> : <div />}
		</Header>
	);
};
