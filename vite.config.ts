import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import css from 'unocss/vite';
import autoImport from 'unplugin-auto-import/vite';
import devtools from 'solid-devtools/vite';
import adapter from 'solid-start-static';

export default defineConfig({
	server: {
		port: 3333,
	},
	plugins: [
		solid({ adapter: adapter() }),
		devtools({
			autoname: true,
			locator:  {
				targetIDE:         'webstorm',
				componentLocation: true,
				jsxLocation:       true,
			},
		}),
		css(),
		autoImport({
			imports: [
				'solid-js',
				{
					'solid-start/server': ['createServerData$', 'createServerAction$', 'useRequest', 'createServerMultiAction$'],
					'solid-start':        ['createCookie', 'createRouteAction', 'createRouteData', 'createSessionStorage', 'createCookieSessionStorage', 'createMemorySessionStorage', 'A', 'Link', 'Style', 'Title', 'useHref', 'useLocation', 'useNavigate', 'useMatch', 'useParams', 'useRoutes', 'useIsRouting', 'useRouteData', 'useServerContext', 'useSearchParams', 'useResolvedPath', 'Navigate'],
					clsx:                 ['clsx'],
					zod:                  ['z'],
				},
			],
			dts: './src/types/auto-imports.d.ts',
		}),
	],
});
