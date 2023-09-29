![npm](https://img.shields.io/npm/v/s-file-load?label=Last%20version)

# s-file-load

Simple file upload Svelte component.

## Live demo

https://s-file-load-khn1ohzvd-s-library.vercel.app/

## Non-exhaustive features list:
 - No other dependencies 
 - No CSS library: ready to use with no overhead
 - Click or drag-and-drop
 - Customizable: label, theme, post-upload actions
 - Return file content in variable 
 - use cases: read config file or other small files
 - example of parsing JSON, YAML, or XML directly to JS objects


## Installation

This package is a Svelte library and is intended to be installed within a Svelte application or another library. 
For example, as described here, you can create a Svelte skeleton Svelte application using:
```bash
pnpm create svelte@latest my-app
```
(I prefer pnpm for the speed and disk space optimization, but the old good npm or yarn work just as well.)

Then install the component:
```bash
pnpm i s-file-load
```

## Examples of Code

```ts
<script lang="ts">
    import { DropFile } from 's-file-load';
    let content: string = ''; // content of the file(s) selected
</script>

<div class="test-container-content">
    <DropFile boxSize="medium" theme="dark" showResult={true} />
</div>

```

## Contact Us

 - through GITHUB
 
## TODO

 - Return content in store
 - REPL

## Credits

 - Created following (https://kit.svelte.dev/docs/packaging).
 - Using ```bash npm create svelte@latest my-app```
 - Inspired by https://flowbite-svelte.com/docs/forms/file-input; like the code but wanted a component more self-sufficient in term of behavior and style.   

## License

 - GNUv3
 - Free to include in open source software 
 - But any commercial application is not granted and will need a separate license (please contact us).
