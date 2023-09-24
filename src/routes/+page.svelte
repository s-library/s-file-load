<script lang="ts">
    import LoadFile from '$lib/LoadFile.svelte';
    import DropFile from '$lib/DropFile.svelte';
    import { accept, boxCSSsize } from '$lib/common';

    export let content: string = ''; // content of the file(s) selected

    let boxSize: keyof typeof boxCSSsize = 'medium';
    let dark: boolean = false;

    function onChangeHandler(e: Event): void {
	    console.log('onchange parent file data:', e);
    }   
    function onKeyPress(e: KeyboardEvent) {
      if ([' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        boxSize = e.target.id;; 
        console.log( boxCSSsize[boxSize] )
      }
    }

    function switchSize(e) {
        console.log(e);
        e.preventDefault();
        boxSize = e.target.id;; 
        console.log( boxCSSsize[boxSize] )
    }
 </script>

<img src="https://img.shields.io/npm/v/s-file-load?label=Last%20version"/>

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

<div class="test-container">
    <div class="test-container-header">
        <span style="float:left">Single File <button style="margin-left:3rem;" on:click={() => (dark = !dark)}>{(dark?"Dark":"Light")}</button></span>
        <span style="float:right" role="button" tabindex="-1" on:keypress={onKeyPress} on:click={switchSize}>
            <button id="small" >Small</button> <button id="medium">Medium</button> <button id="big">Big</button> <button id="xbig">Huge</button>
        </span>
    </div>
    <div class="test-container-content">
        <DropFile id="DropFileDefault" boxSize={boxSize} theme={dark} showResult={true} on:change={onChangeHandler} on:message={(e) => console.log(`message from component {e}`)} />
    </div>
</div>
   
<br/>
<div class="test-container">
    <div class="test-container-header">
        <span style="float:left">Multiple Files <button style="margin-left:3rem;" on:click={() => (dark = !dark)}>{(dark?"Dark":"Light")}</button></span>
        <span style="float:right" role="button" tabindex="-1" on:keypress={onKeyPress} on:click={switchSize}>
            <button id="small" >Small</button> <button id="medium">Medium</button> <button id="big">Big</button> <button id="xbig">Huge</button>
        </span>
    </div>
    <div class="test-container-content">
        <DropFile id="DropFileMultiple" boxSize={boxSize} theme={dark} multiple showResult={true} on:change={onChangeHandler} on:message={(e) => console.log(`message from component {e}`)} />
    </div>
</div>

<style>
    .test-container { 
        width:80%;
        border: 1px solid #666; 
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
    }
    .test-container-content { 
        display: flex;
        border: 1px solid #666;
        padding: 1rem;
        align-items: center;
        justify-content: center;
    }
    .test-container-header {
        border: 1px solid #666; 
        padding:.5rem; 
        padding-bottom:1.8rem; 
        padding-right:.5rem; 
        padding-left:.5rem;
        background-color: #eee;
    }

</style>