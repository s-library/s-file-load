<script lang="ts">
//    import { config, ACCEPT, boxCSSsize } from '$lib/common.js';
    import LoadFile from '$lib/LoadFile.svelte';
//    import DropFile from '$lib/DropFile.svelte';
    import TestContainer from '$components/TestContainer.svelte';
//    import ThemeSwitcher from '$components/ThemeSwitcher.svelte';
    import Switch from '$components/Switch.svelte';
    import { config } from '$lib/common.js';

    export let content: string = ''; // content of the file(s) selected

    function onChangeHandler(e: Event): void {
	    console.log('onchange parent file data:', e);
    }   

    //let debug="off";
    //$: debug=="off"?config.DEBUG=false:config.qDEBUG=true;
    let value: string;
    $: if (value=="on") config.DEBUG=true;
    else config.DEBUG=false;
</script>

<main>

    <img src="https://img.shields.io/npm/v/s-file-load?label=Last%20version" alt="Last Version"/>
    <p style="display:block">
        <span style="margin-left:1rem">Use JS console to see debug {value} </span>
        <Switch style="margin-left:1rem" label="Debug:" options={['off', 'on']} fontSize={14} bind:value={value}/>    
    </p>

    <div class=section>
        <p style="padding-left:.3rem">No output</p>
        <LoadFile bind:content={content} showResult={false} showContent={false} multiple={false} on:change={onChangeHandler} />
    </div>

    <div class=section>
        <p style="padding-left:.3rem">Result</p>
        <LoadFile bind:content={content} showResult={true} showContent={false} multiple={false} on:change={onChangeHandler} />
    </div>

    <div class=section>
        <p style="padding-left:.3rem">Content</p>
        <LoadFile bind:content={content} showResult={false} showContent={true} multiple={false} on:change={onChangeHandler} />
    </div>

    <div class=section>
        <p style="padding-left:.3rem">Result and Content</p>
        <LoadFile bind:content={content} showResult={true} showContent={true} multiple={false} on:change={onChangeHandler} />
    </div>


    <br/>

    <TestContainer title="Single File" on:change={onChangeHandler} >
    </TestContainer>

    <br/>

    <TestContainer title="Multiple Files" on:change={onChangeHandler} >
    </TestContainer>

</main>

<style>
    .section { 
        width:80%;
        border: 1px solid #666; 
        margin-top: 1rem;
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
    }
</style>