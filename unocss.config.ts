import type { Variant } from 'unocss';
import {
	defineConfig,
	transformerDirectives,
	transformerVariantGroup,
	presetWind,
	presetUno,
	presetWebFonts,
	presetIcons,
	transformerCompileClass,
} from 'unocss';
import { theme } from './tailwind.config.cjs';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';

const createVariantSelector = (select: string, cb: (state: string, s: string) => string): Variant => (
	(matcher) => {
		if (!matcher.startsWith(select)) return matcher;

		const [variant, ...rest] = matcher.split(':');

		const state = variant.replace(select, '');

		return {
			selector: (s) => cb(state, s),
			matcher:  rest.join(':'),
		};
	}
);


const createSimpleVariant = (select: string, selector: (s: string) => string): Variant => (
	(matcher) => {
		if (!matcher.startsWith(select)) return matcher;

		return {
			matcher: matcher.slice(select.length),
			selector,
		};
	}
);

const config = defineConfig({
	// WebStorm don't support unocss config, so theme put in tailwind.config.cjs
	theme: theme.extend,
	rules: [
		// It's put non-breaking space as content. Useful for icons as pseudo-elements
		['c_', { content: '"\xa0"' }],
		// Allow to create Y/X grid placeing like place-items-[center-stretch] (center vertically but stretch horizontaly)
		[/^place-(items|self)-\[\w+]$/, ([matcher]) => {
			const [selector, value] = matcher.split('-[');

			return {
				[selector]: value.replace(/_/g, ' ').slice(0, -1),
			};
		}],
		// Shorthand of h-$X w-$X (size-$X)
		[/^((min|max)-)?size-(\d+)(.+)?$/, ([matcher]) => {
			const [type, sizePart] = matcher.split('size-');
			const sizeNum = Number(sizePart);
			const createRes = (width: string, height?: string) => ({ [`${type}width`]: width, [`${type}height`]: height ?? width });

			if (sizeNum > 0) return createRes(`${sizeNum / 4}rem`);
			if (sizePart.endsWith('v')) return createRes(`${sizePart}w`, `${sizePart}h`);
			if (sizePart.includes('/')) {
				const [prev, suf] = sizePart.split('/');
				const percent = 100 * Number(prev) / Number(suf);
				return createRes(`${percent}%`);
			}

			return createRes(sizePart);
		}],
	],
	variants: [
		// Allow to select deep childrens of type like: deep-of-input select all inputs inside
		createVariantSelector('deep-of-',  (state, s) => `${s} ${state}`),
		// Allow to select direct childrens of type like: of-input select all shallow inputs inside
		createVariantSelector('of-',  (state, s) => `${s}>${state}`),
		// Shorthand of hover and focus. Many time hover and focus effect are the same
		createSimpleVariant('hocus:', (s) => `${s}:hover, ${s}:focus`),
		// Select all children of element
		createSimpleVariant('deep-children:', (s) => `${s} *`),

		// Match data and aria values. Like data-selected select elements where data-selected exist
		(matcher) => {
			if (!['aria-', 'data-'].some((v) => matcher.startsWith(v))) return matcher;

			const [variant, ...rest] = matcher.split(':');

			const index = matcher.indexOf('[');
			const value = index != -1 ? matcher.slice(index + 1, matcher.indexOf(']')) : 'true';
			const selector = variant.replace(/-\[.+]$/, '');


			return {
				selector: (s) => `${s}[${selector}="${value}"]`,
				matcher:  rest.join(':'),
			};
		},
		// Desktop first version of media selector. Like max-md work on screen smaller then 768px
		(matcher) => {
			if (!matcher.startsWith('max-')) return matcher;

			const [variant, ...rest] = matcher.split(':');

			const mediaPx = {
				sm:    640,
				md:    768,
				lg:    1024,
				xl:    1280,
				'2xl': 1536,
			}[variant.replace('max-', '')];

			if (!mediaPx) return matcher;

			return {
				matcher: rest.join(':'),
				parent:  `@media (max-width: ${mediaPx}px)`,
			};
		},
	],
	presets: [
		presetUno(),
		presetWind(),
		presetWebFonts({
			fonts: {
				sans: 'Roboto',
			},
		}),
		presetIcons({
			extraProperties: {
				display:       'inline-block',
				height:        'auto',
				'min-height':  '1em',
				'white-space': 'nowrap',
			},
			cdn:         'https://esm.sh/',
			collections: {
				// All icons placed inside src/assets/icons will be listed as i-my-${file-name}
				my: FileSystemIconLoader(
					'./src/assets/icons',
					(svg) => (
						svg
							// replace width and height with viewBox (responsive) when width is first
							.replace(/width="\d+" height="\d+"/, (size) => {
								const [width, height] = size.match(/\d+/g) || [];
								return `viewBox="0 0 ${width} ${height}"`;
							})
							// replace width and height with viewBox (responsive) when height is first
							.replace(/height="\d+" width="\d+"/, (size) => {
								const [height, width] = size.match(/\d+/g) || [];
								return `viewBox="0 0 ${width} ${height}"`;
							})
							// often black color is color of text, so can be replaced with currentColor
							.replaceAll('#fff', 'currentColor')
					),
				),
			},
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
		transformerCompileClass(),
	],
});

export default config;
