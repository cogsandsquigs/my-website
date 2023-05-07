type Page = {
	// The path to the page.
	path: string;

	// Metadata about the page.
	meta: {
		// The title of the page.
		title: string;

		// The date the page was published.
		date?: Date;

		// An optional description of the page.
		description?: string;

		// The tags for the page.
		tags: string[];
	};
};

/// Gets all the pages from the `/content` directory.
export const fetch_pages = async (): Promise<Page[]> => {
	const all_pages = import.meta.glob("/content/**/*.md");

	const iterable_pages = Object.entries(all_pages);

	const all_pages_data = await Promise.all(iterable_pages.map(raw_to_page));

	return all_pages_data;
};

// Gets all the posts from the `/content/posts` directory.
export const fetch_posts = async (): Promise<Page[]> => {
	const all_posts = import.meta.glob("/content/posts/*.md");

	const iterable_posts = Object.entries(all_posts);

	const all_posts_data = await Promise.all(iterable_posts.map(raw_to_page));

	return all_posts_data;
};

// Converts a raw page to a `Page` object.
const raw_to_page = async ([path, resolver]: [string, () => Promise<unknown>]) => {
	const { metadata } = (await resolver()) as any;
	const page_path = path.slice(8, -3);

	console.log(metadata);
	console.log(page_path);

	return {
		path: page_path,
		meta: {
			title: metadata.title,
			date: metadata.date,
			description: metadata.description,
			tags: metadata.tags ?? []
		}
	};
};
