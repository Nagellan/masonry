import styled from 'styled-components';

const Footer = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	text-align: center;
	padding: 4px 8px;
`;

export const PageFooter = () => {
	return (
		<Footer>
			Photos provided by{' '}
			<a href="https://pexels.com" target="_blank">
				Pexels
			</a>
		</Footer>
	);
};
