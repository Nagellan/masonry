import { memo } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
	outline: none;
	border: none;
	box-shadow: none;

	padding: 10px 12px;
	border-radius: 20px;
	color: white;
	background-color: black;
	font-size: 14px;
`;

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo((props: Props) => {
	return <Wrapper {...props} />;
});
