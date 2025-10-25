import { memo, useMemo, useRef, useCallback } from 'react';

import type { SupportedId, RenderComponent } from './types';
import { useHeight } from '@/hooks/useHeight';

type Props<Id extends SupportedId> = {
	id: Id;
	index: number;
	top: number | undefined;
	renderComponent: RenderComponent<Id>;
	onResize: (id: Id, height: number) => void;
};

const ColumnItemWithoutMemo = <Id extends SupportedId>({
	id,
	index,
	top,
	renderComponent,
	onResize,
}: Props<Id>) => {
	const ref = useRef<HTMLElement>(null);

	useHeight(
		ref,
		useCallback((height) => onResize(id, height), [id, onResize]),
	);

	const style = useMemo(
		() => ({
			top: `${top ?? 0}px`,
			// while position is not yet calculated, hide photo to avoid shifts & blinks
			visibility: top === undefined ? 'hidden' : 'visible',
			position: 'absolute',
		}),
		[top],
	);

	return renderComponent({ id, index, style, ref });
};

export const ColumnItem = memo(
	ColumnItemWithoutMemo,
) as typeof ColumnItemWithoutMemo; // avoid losing generic
