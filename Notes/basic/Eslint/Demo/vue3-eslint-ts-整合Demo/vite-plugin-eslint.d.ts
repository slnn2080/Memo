import { ViteDevServer, Plugin } from 'vite'
import * as _compiler from 'vue/compiler-sfc'
import { SFCScriptCompileOptions, SFCTemplateCompileOptions, SFCStyleCompileOptions } from 'vue/compiler-sfc'

interface VueQuery {
  vue?: boolean,
  src?: string,
  type?: 'script' | 'template' | 'style' | 'custom',
  index?: number,
  lang?: string,
  raw?: boolean,
  url?: boolean,
  scoped?: boolean,
  id?: string
}
declare function parseVueRequest(id: string): {
  filename: string,
  query: VueQuery
}

interface Options {
  include?: string | RegExp | Array<string | RegExp>,
  exclude?: string | RegExp | Array<string | RegExp>,
  isProduction?: boolean,
  script?: Partial<Pick<SFCScriptCompileOptions, 'babelParserPlugins' | 'globalTypeFiles' | 'defineModel' | 'propsDestructure' | 'fs' | 'reactivityTransform' | 'hoistStatic'>>,
  template?: Partial<Pick<SFCTemplateCompileOptions, 'compiler' | 'compilerOptions' | 'preprocessOptions' | 'preprocessCustomRequire' | 'transformAssetUrls'>>,
  style?: Partial<Pick<SFCStyleCompileOptions, 'trim'>>,
  /**
     * Transform Vue SFCs into custom elements.
     * - `true`: all `*.vue` imports are converted into custom elements
     * - `string | RegExp`: matched files are converted into custom elements
     *
     * @default /\.ce\.vue$/
     */
  customElement?: boolean | string | RegExp | Array<string | RegExp>,
  /**
     * Enable Vue reactivity transform (experimental).
     * https://vuejs.org/guide/extras/reactivity-transform.html
     * - `true`: transform will be enabled for all vue,js(x),ts(x) files except
     *           those inside node_modules
     * - `string | RegExp`: apply to vue + only matched files (will include
     *                      node_modules, so specify directories if necessary)
     * - `false`: disable in all cases
     *
     * @deprecated the Reactivity Transform proposal has been dropped. This
     * feature will be removed from Vue core in 3.4. If you intend to continue
     * using it, disable this and switch to the [Vue Macros implementation](https://vue-macros.sxzz.moe/features/reactivity-transform.html).
     *
     * @default false
     */
  reactivityTransform?: boolean | string | RegExp | Array<string | RegExp>,
  /**
     * Use custom compiler-sfc instance. Can be used to force a specific version.
     */
  compiler?: typeof _compiler
}
interface ResolvedOptions extends Options {
  compiler: typeof _compiler,
  root: string,
  sourceMap: boolean,
  cssDevSourcemap: boolean,
  devServer?: ViteDevServer,
  devToolsEnabled?: boolean
}
declare function vuePlugin(rawOptions?: Options): Plugin

export { type Options, type ResolvedOptions, type VueQuery, vuePlugin as default, parseVueRequest }
