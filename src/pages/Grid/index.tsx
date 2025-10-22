import { Page } from '@/components/page/Page';
import { PageHeader } from '@/components/page/PageHeader';
import { PageFooter } from '@/components/page/PageFooter';

import { Content } from './Content';

export const Grid = () => {
	return (
		<Page>
			<PageHeader
				title={
					<div>
						Masonry <i>by ireknazm</i>
					</div>
				}
			/>
			<Content />
			<PageFooter />
		</Page>
	);
};
