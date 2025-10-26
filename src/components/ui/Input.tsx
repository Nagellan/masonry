import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.input`
	background-color: transparent;
	border: none;
	padding: 10px 12px;
	border-radius: 20px;
	font-size: 14px;

	&::placeholder {
		color: #404040;
	}
`;

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return <Wrapper {...props} />;
};
