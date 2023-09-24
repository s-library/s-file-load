<script lang="ts">
    import { Config, ACCEPT, boxCSSsize } from '$lib/common.js';
    import LoadFile from '$lib/LoadFile.svelte';
    import DropFile from '$lib/DropFile.svelte';
    import TestContainer from '$components/TestContainer.svelte';
    import ThemeSwitcher from '$components/ThemeSwitcher.svelte';

    export let content: string = ''; // content of the file(s) selected

    function onChangeHandler(e: Event): void {
	    console.log('onchange parent file data:', e);
    }   

 </script>

<img src="https://img.shields.io/npm/v/s-file-load?label=Last%20version" alt="Last Version"/>

<p>No output</p>
<div class=section>
    <LoadFile bind:content={content} showResult={false} showContent={false} multiple={false} on:change={onChangeHandler} />
</div>

<p>Result</p>
<div class=section>
    <LoadFile bind:content={content} showResult={true} showContent={false} multiple={false} on:change={onChangeHandler} />
</div>

<p>Content</p>
<div class=section>
    <LoadFile bind:content={content} showResult={false} showContent={true} multiple={false} on:change={onChangeHandler} />
</div>

<p style="padding-left:.9rem">Result and Content</p>
<div class=section>
    <LoadFile bind:content={content} showResult={true} showContent={true} multiple={false} on:change={onChangeHandler} />
</div>


<br/>

<TestContainer title="Single File" on:change={onChangeHandler} >
</TestContainer>

<br/>

<TestContainer title="Multiple Files" on:change={onChangeHandler} >
</TestContainer>


<style>
    .section { 
        width:80%;
        border: 1px solid #666; 
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
    }
</style>