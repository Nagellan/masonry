import styled from 'styled-components';

import { Button } from '@/components/ui/Button';

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;
`;

const FixedSizeButton = styled(Button)`
	height: 36px;
	width: 36px;
`;

type Props = {
	zoom: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onZoomFull: () => void;
};

export const ZoomControl = ({
	zoom,
	onZoomIn,
	onZoomOut,
	onZoomFull,
}: Props) => {
	return (
		<Wrapper>
			<FixedSizeButton key="minus" onClick={onZoomOut}>
				-
			</FixedSizeButton>
			<Button key="full" onClick={onZoomFull}>
				{zoom}%
			</Button>
			<FixedSizeButton key="plus" onClick={onZoomIn}>
				+
			</FixedSizeButton>
		</Wrapper>
	);
};
