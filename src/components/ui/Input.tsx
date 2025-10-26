import { memo } from 'react';
import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const Wrapper = styled.div``;

const Component = styled.input`
	background-color: transparent;
	border: none;
	padding: 10px 12px;
	border-radius: 20px;
	font-size: 14px;

	&::placeholder {
		color: #404040;
	}
`;

const CloseButton = styled(Button)`
	position: absolute;
	right: 2px;
	width: 36px;
`;

type Props = {
	clearable?: boolean;
	onClear?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = memo(({ clearable = false, onClear, ...props }: Props) => {
	return (
		<Wrapper>
			<Component {...props} />
			{clearable && props.value && (
				<CloseButton onClick={onClear}>✖</CloseButton>
			)}
		</Wrapper>
	);
});
