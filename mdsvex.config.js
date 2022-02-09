import { defineMDSveXConfig as defineConfig } from "mdsvex";
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from 'remark-math';

const config = defineConfig({
  extensions: [".svelte.md", ".md", ".svx"],

  smartypants: {
    dashes: "oldschool",
  },

  layout: {
			posts: "./src/routes/posts/layout.svelte"
			//projects: "./src/routes/projects/layout.svelte"
	},

  remarkPlugins: [
    remarkMath,
  ],
  
  rehypePlugins: [
    rehypeKatexSvelte,
  ],
});

export default config;
