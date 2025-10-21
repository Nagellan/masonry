import type { ReactNode } from 'react';
import styled from 'styled-components';

const FullScreen = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const MaxWidthColumn = styled.div`
	max-width: 80ch;
	padding-left: 24px;
	padding-right: 24px;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;

	text-align: center;
`;

const Title = styled.h2`
	margin: 0;
	font-weight: bold;
`;

const Description = styled.p`
	margin: 0;
`;

type Props = {
	title: ReactNode;
	description?: ReactNode;
	action?: ReactNode;
};

export const PageStatus = ({ title, description, action }: Props) => {
	return (
		<FullScreen>
			<MaxWidthColumn>
				<Title>{title}</Title>
				<Description>{description}</Description>
				{action}
			</MaxWidthColumn>
		</FullScreen>
	);
};
