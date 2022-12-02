import solid from "solid-start/vite";
import { defineConfig } from "vite";
import css from 'unocss/vite';
import autoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    solid(),
    css(),
    autoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'solid-js',
        {
          '@tanstack/solid-query': ['createQuery', 'createInfiniteQuery', 'useQueryClient'],
          clsx: ['clsx'],
        },
      ],
    }),
  ],
});
