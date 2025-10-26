import type { JSX, RefObject } from 'react';

export type SupportedId = string | number;

export type RenderComponent<Id extends SupportedId> = (props: {
	id: Id;
	index: number;
	ref: RefObject<HTMLElement | null>;
}) => JSX.Element;
