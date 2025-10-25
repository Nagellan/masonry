import { memo, useMemo, useRef, useLayoutEffect } from 'react';
import type { SupportedId, RenderComponent } from './types';

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

	useLayoutEffect(() => {
		const el = ref.current;
		if (!el) return;

		const resizeObserver = new ResizeObserver(([entry]) => {
			onResize(id, entry.target.clientHeight);
		});

		resizeObserver.observe(el);

		return () => {
			resizeObserver.unobserve(el);
		};
	}, [id, onResize]);

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
