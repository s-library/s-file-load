<script lang="ts">
    import { Config, boxCSSsize } from '$lib/common.js';
    import DropFile from '$lib/DropFile.svelte';
 
    export let title: string = "Test";

    let boxSize: keyof typeof boxCSSsize = 'medium';
    let dark: boolean = false;

  
    function switchSize(e: Event) {
        e.preventDefault();
        if (e.target) {
            boxSize =  <keyof typeof boxCSSsize>(e.target as Element).id;
            if (Config._DEBUG) 
                console.log( boxCSSsize[boxSize] )
        }
    }
 </script>

<div class="test-container">
    <div class="test-container-header">
        <span style="float:left">{title} <button style="margin-left:3rem;" on:click={() => (dark = !dark)}>{(dark?"Dark":"Light")}</button></span>
        <span style="float:right" role="button" tabindex="-1" on:keypress={switchSize} on:click={switchSize}>
            <button id="small" >Small</button> <button id="medium">Medium</button> <button id="big">Big</button> <button id="xbig">Huge</button>
        </span>
    </div>
    <div class="test-container-content">
        <DropFile id="DropFileMultiple" boxSize={boxSize} theme={dark}  showResult={true} on:message={(e) => console.log(`message from component {e}`)} />
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