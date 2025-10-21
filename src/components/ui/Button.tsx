import { memo } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled.button``;

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = memo((props: Props) => {
	return <Wrapper {...props} />;
});
