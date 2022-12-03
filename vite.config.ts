import solid from 'solid-start/vite';
import { defineConfig } from 'vite';
import css from 'unocss/vite';
import autoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  resolve: {
    alias: {
      x: '/src/helpers/x',
    },
  },
  plugins: [
    solid(),
    css(),
    autoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'solid-js',
        {
          'solid-start': ['useParams', 'A'],
          clsx: ['clsx'],
        },
      ],
    }),
  ],
});
