<script lang="ts">
    import { config, boxCSSsize } from '$lib/common.js';
    import DropFile from '$lib/DropFile.svelte';
    import ThemeSwitcher from '$components/ThemeSwitcher.svelte';

    export let title: string = "Test";

    let boxSize: keyof typeof boxCSSsize | any = 'medium';
    let dark: boolean = false;

    function switchTheme(e: Event) {
        e.preventDefault();
        if (e.target) {
            dark = !dark;
            if (config.DEBUG)
                console.log(dark)
        }
    }

    function switchSize(e: Event) {
        e.preventDefault();
        if (e.target) {
            boxSize =  <keyof typeof boxCSSsize>(e.target as Element).id;
            if (config.DEBUG) 
                console.log( boxCSSsize[boxSize] )
        }
    }
 </script>

<div class="test-container">
    <div class="test-container-header">
        <span style="float:left">{title}</span>
        <span style="padding-left: 3rem; float:left"><ThemeSwitcher  on:click={switchTheme}>{dark?"Dark":"Light"}</ThemeSwitcher></span>
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