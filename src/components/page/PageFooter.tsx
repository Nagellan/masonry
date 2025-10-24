import { memo } from 'react';
import styled from 'styled-components';

import { Bubble as UIBubble } from '@/components/ui/Bubble';

const Footer = styled.footer`
	position: fixed;
	bottom: 0px;
	left: 0;
	right: 0;
	padding: 4px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	gap: 4px;

	z-index: 2;
`;

const Bubble = styled(UIBubble)`
	font-size: 14px;
`;

export const PageFooter = memo(() => {
	return (
		<Footer>
			<Bubble>
				Photos provided by{' '}
				<a href="https://pexels.com" target="_blank" tabIndex={1}>
					Pexels
				</a>
			</Bubble>
			<Bubble>
				Made by{' '}
				<a
					href="https://github.com/Nagellan"
					target="_blank"
					tabIndex={2}
				>
					ireknazm
				</a>{' '}
				for{' '}
				<a href="https://picsart.com" target="_blank" tabIndex={3}>
					Picsart
				</a>
			</Bubble>
		</Footer>
	);
});
