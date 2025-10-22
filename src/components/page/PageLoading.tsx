import styled from 'styled-components';

const FullScreen = styled.div`
	width: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
`;

export const PageLoading = () => {
	return <FullScreen>...</FullScreen>;
};
