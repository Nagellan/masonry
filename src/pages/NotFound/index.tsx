import styled from 'styled-components';
import { Link } from 'react-router';

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const NotFound = () => {
	return (
		<Column>
			<h1>Page not found!</h1>
			<Link to="/">Go home</Link>
		</Column>
	);
};
