import styled from 'styled-components';

const Footer = styled.footer`
	position: fixed;
	bottom: 0px;
	width: 100%;
	padding: 4px;

	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	gap: 4px;
`;

const Bubble = styled.div`
	display: inline;
	flex-shrink: 0;

	padding: 10px 12px;
	border-radius: 20px;

	background-color: #ffffff80;
	backdrop-filter: blur(10px);

	font-size: 14px;
`;

export const PageFooter = () => {
	return (
		<Footer>
			<Bubble>
				Photos provided by{' '}
				<a href="https://pexels.com" target="_blank">
					Pexels
				</a>
			</Bubble>
			<Bubble>
				Made by{' '}
				<a href="https://github.com/Nagellan" target="_blank">
					ireknazm
				</a>{' '}
				for{' '}
				<a href="https://picsart.com" target="_blank">
					Picsart
				</a>
			</Bubble>
		</Footer>
	);
};
