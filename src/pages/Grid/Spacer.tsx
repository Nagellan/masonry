import styled from 'styled-components';

import { useInViewport } from './useInViewport';
import type { Position } from './useInViewport';

const Wrapper = styled.div<{ $height: number }>`
	display: flex;
	flex-shrink: 0;
	height: ${(props) => props.$height}px;
`;

type Props = {
	height: number;
	onView: (inView: boolean, position: Position, height: number) => void;
};

export const Spacer = ({ height, onView }: Props) => {
	const ref = useInViewport<HTMLDivElement>(onView);

	return <Wrapper $height={height} ref={ref} />;
};
