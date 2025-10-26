import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { Page } from '@/components/page/Page';
import { PageHeader } from '@/components/page/PageHeader';
import { PageLoading } from '@/components/page/PageLoading';
import { PageFooter } from '@/components/page/PageFooter';
import { Input } from '@/components/ui/Input';
import api from '@/api';
import type { Photo } from '@/api/types';

import { Content } from './Content';

export const Grid = () => {
	const [page, setPage] = useState<number>(1);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [inputValue, setInputValue] = useState<string>(
		() => localStorage.getItem('search') ?? '',
	);
	const [search, setSearch] = useState<string>(
		() => localStorage.getItem('search') ?? '',
	);
	const [noMorePages, setNoMorePages] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		const lastPage = localStorage.getItem('lastPage');

		if (lastPage) {
			localStorage.removeItem('lastPage');
			api.getAllPhotos(Number(lastPage), 80, search).then((response) => {
				setPhotos(response.photos);
				setNoMorePages(!response.nextPage);
				setLoading(false);
			});
		} else {
			api.getPhotos(page, 80, search).then((response) => {
				if (page === 1) {
					setPhotos(response.photos);
				} else {
					setPhotos((prevPhotos) => [
						...prevPhotos,
						...response.photos,
					]);
				}

				setNoMorePages(!response.nextPage);
				setLoading(false);
			});
		}
	}, [page, search]);

	const onScrollEnd = useDebouncedCallback(() => {
		if (noMorePages) return;
		setPage((prev) => prev + 1);
	}, 300);

	const onSearch = useDebouncedCallback((value: string) => {
		setSearch(value);
		setPage(1);
		localStorage.setItem('search', value);
	}, 300);

	const title = (
		<div>
			Masonry <i>by ireknazm</i>
		</div>
	);

	if (loading && page === 1) {
		return (
			<Page>
				<PageHeader title={title} />
				<PageLoading />
				<PageFooter />
			</Page>
		);
	}

	return (
		<Page>
			<PageHeader
				title={title}
				right={
					<Input
						value={inputValue}
						placeholder="Search"
						clearable
						onChange={(event) => {
							setInputValue(event.target.value);
							onSearch(event.target.value);
						}}
						onClear={() => {
							setInputValue('');
							onSearch('');
						}}
					/>
				}
			/>
			<Content photos={photos} page={page} onScrollEnd={onScrollEnd} />
			<PageFooter />
		</Page>
	);
};
