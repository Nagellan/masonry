import type { JSX, RefObject } from 'react';

export type SupportedId = string | number;

export type Style = Record<string, string>;

export type RenderComponent<Id extends SupportedId> = (props: {
	id: Id;
	index: number;
	style: Style;
	ref: RefObject<HTMLElement | null>;
}) => JSX.Element;
