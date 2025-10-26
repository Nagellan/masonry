# Masonry _by ireknazm_

> No code was copied from anywhere, no line of code was generated with AI. I am proud of the work I've done.

## Install

```bash
# set nodejs version
nvm use

# install dependencies
npm i

# create local env file with your Pexels API token
echo "VITE_PEXELS_API_TOKEN=<your API token>" > .env.local
```

## Run

```bash
# run dev server
npm run dev

# build production bundle
npm run build

# run production server from built bundle
npm run preview

# run tests
npm run test
```

## Design decisions

```bash
src
├── api          # entry point to API work
├── components   # reusable UI components
│   ├── Masonry  # component with masonry grid layout logic
│   ├── page     # page construction components
│   └── ui       # local UI-kit
├── pages        # application pages
│   ├── Grid
│   ├── Photo
│   └── NotFound
├── constants    # shared constants
└── types        # shared types
```

[React Compiler v1.0 is available now](https://react.dev/blog/2025/10/07/react-compiler-1) and could be used in a project, but wasn't. As one of the tasks was to show knowledge and skills on memoization, I decided to refuse from the Compiler. In real project I would definitely use it.

React Router's data mode was picked as it doesn't require project restructuring as framework mode, and it allows all library modern rich functionality unlike declarative mode.

All masonry grid layout logic is encapsulated into the `Masonry` component. It's designed to be used as an external lib.

All API is accessible via `api` default import as an entry point. Specific methods of an API are accessible by dot notating them after the `api`.

Each page folder's index file contains: page data fetch, page construction by blocks, page state visualization depending on a network request state.

Error boundary is used inside a `Page` component that wraps every page, so we have control over each page errors distinctively.

`main.tsx` contains all routing logic as it's small and doesn't really need its own files. Where the entry point is — there is a routing, very evidently.

`tabindex` is set up manually so there is an opportunity to navigate using keyboard tab button.

## Performance evaluation

Performance was evaluated using Lighthouse on an optimized and minified production build.

All metrics are "green" except LCP which is "red". That's because LCP depends on network, especially on image load time. This is clearly seen by results: LCP on mobile is larger than LCP on desktop. This happens because on mobile we have only 1 column of images while on desktop we have 6. The more columns there are, the less width they have. Thus, one column on mobile is wider than one column on desktop, leading to larger image size to load, leading to larger LCP on mobile.

Largest image load also depends on load time of all images above it in a column as it's necessary for calculating the position.

Images were optimized with `srcset`, `sizes`, and `fetchpriority` attributes. Despite LCP being "red", this metric is optimized well.

**Navigation (Desktop), Grid page**:

| Metric | Result |
| ------ | ------ |
| Score: | 84     |
| FCP:   | 0.4s   |
| LCP:   | 2.7s   |
| TBT:   | 0ms    |
| CLS:   | 0.008  |
| SI:    | 1.2s   |

**Navigation (Mobile), Grid page**:

| Metric | Result |
| ------ | ------ |
| Score: | 86     |
| FCP:   | 1.4s   |
| LCP:   | 4.0s   |
| TBT:   | 60ms   |
| CLS:   | 0      |
| SI:    | 3.3s   |

Application was also tested on slow network and CPU throttling emulations. Responsiveness was checked by crazy resizing the browser window: it may freeze a bit and blink on columns amount change, but imho that's a satisfactory result as no users really ofthen resize their windows.

## Future works

If I have more time, I would like to perform an A/B test with an enhanced solution. The idea is to try getting rid of the column components inside masonry and instead locate item components both vertically and horizontally (now only vertical positions are calculated as width and horizonal positioning are handled by column components).

What can be achieved by implementing this solution:

- It becomes possible to animate item components repositioning on columns amount change.
- It may improve performance and fix flickering as there would be no item components reindexing, reshuffling between columns and massive rerendering due to columns amount change.
