import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';

import { useHeight } from '../hooks/useHeight';
import { useScrollPosition } from '../hooks/useScrollPosition';
import type { RenderComponent } from '../types';
import { Masonry } from '..';

vi.mock('../hooks/useHeight', () => ({
	useHeight: vi.fn(),
}));
vi.mock('../hooks/useScrollPosition', () => ({
	useScrollPosition: vi.fn(),
}));

describe('Masonry', () => {
	it('Renders only top on-screen components', async () => {
		vi.mocked(useHeight).mockImplementation((ref, callback) => {
			useEffect(() => {
				if (!ref.current) return;
				callback(Number(ref.current.dataset.height));
			}, [ref, callback]);
		});
		vi.mocked(useScrollPosition).mockReturnValue(0);

		render(
			<Masonry
				columns={1}
				gapY={0}
				threshold={0}
				ids={[1, 2, 3, 4]}
				renderComponent={({ id, ref }) => (
					<div
						ref={(r) => {
							ref.current = r;
						}}
						data-height={300}
					>
						{id}
					</div>
				)}
				data-height={400}
			/>,
		);

		expect(screen.queryByText('1')).toBeInTheDocument();
		expect(screen.queryByText('2')).toBeInTheDocument();
		expect(screen.queryByText('3')).not.toBeInTheDocument();
		expect(screen.queryByText('4')).not.toBeInTheDocument();
	});

	it('Renders only bottom on-screen components when scrolled to bottom', async () => {
		vi.mocked(useHeight).mockImplementation((ref, callback) => {
			useEffect(() => {
				if (!ref.current) return;
				callback(Number(ref.current.dataset.height));
			}, [ref, callback]);
		});
		vi.mocked(useScrollPosition).mockReturnValue(800);

		render(
			<Masonry
				columns={1}
				gapY={0}
				threshold={0}
				ids={[1, 2, 3, 4]}
				renderComponent={({ id, ref }) => (
					<div
						ref={(r) => {
							ref.current = r;
						}}
						data-height={300}
					>
						{id}
					</div>
				)}
				data-height={400}
			/>,
		);

		expect(screen.queryByText('1')).not.toBeInTheDocument();
		expect(screen.queryByText('2')).not.toBeInTheDocument();
		expect(screen.queryByText('3')).toBeInTheDocument();
		expect(screen.queryByText('4')).toBeInTheDocument();
	});

	it('Recalculates on-screen components when column amount changes', async () => {
		vi.mocked(useHeight).mockImplementation((ref, callback) => {
			useEffect(() => {
				if (!ref.current) return;
				callback(Number(ref.current.dataset.height));
			}, [ref, callback]);
		});
		vi.mocked(useScrollPosition).mockReturnValue(0);

		const ids = [1, 2, 3, 4, 5, 6];
		const renderComponent: RenderComponent<number> = ({ id, ref }) => (
			<div
				ref={(r) => {
					ref.current = r;
				}}
				data-height={300}
			>
				{id}
			</div>
		);

		const { rerender } = render(
			<Masonry
				columns={1} // initially we have only 1 column
				gapY={0}
				threshold={0}
				ids={ids}
				renderComponent={renderComponent}
				data-height={400}
			/>,
		);

		expect(screen.queryByText('1')).toBeInTheDocument();
		expect(screen.queryByText('2')).toBeInTheDocument();
		expect(screen.queryByText('3')).not.toBeInTheDocument();
		expect(screen.queryByText('4')).not.toBeInTheDocument();
		expect(screen.queryByText('5')).not.toBeInTheDocument();
		expect(screen.queryByText('6')).not.toBeInTheDocument();

		rerender(
			<Masonry
				columns={2} // now there are 2 columns
				gapY={0}
				threshold={0}
				ids={ids}
				renderComponent={renderComponent}
				data-height={400}
			/>,
		);

		expect(screen.queryByText('1')).toBeInTheDocument();
		expect(screen.queryByText('2')).toBeInTheDocument();
		expect(screen.queryByText('3')).toBeInTheDocument();
		expect(screen.queryByText('4')).toBeInTheDocument();
		expect(screen.queryByText('5')).not.toBeInTheDocument();
		expect(screen.queryByText('6')).not.toBeInTheDocument();
	});
});
