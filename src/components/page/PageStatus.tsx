import type { ReactNode } from 'react';
import styled from 'styled-components';

const FullScreen = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
`;

const MaxWidthColumn = styled.div`
	max-width: 80ch;
	padding-left: 24px;
	padding-right: 24px;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;

	text-align: center;
`;

const Texts = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
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
				<Texts>
					<Title>{title}</Title>
					<Description>{description}</Description>
				</Texts>
				{action}
			</MaxWidthColumn>
		</FullScreen>
	);
};
