<script lang="ts">
	/**
	* Component to upload a file

        import LoadFile from '$lib/LoadFile.svelte';
        let content = "";
        <div class=section>
		    <LoadFile bind:content={content} showResult={true} multiple={false}></LoadFile>
		    <!-- 
                <div style='margin:.5rem; width=100%; height=10rem;'>
			        {content}
		        </div> 
            -->
	    </div>
        section {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 0.6;
        }

	*/	
	import { onMount } from 'svelte';
	import { ACCEPT, config, readFile } from '$lib/common.js';

	export let files: FileList | undefined = undefined;

	export let label: string = "Select a file to load";
	export let multiple: boolean = false;
	export let showResult: boolean = false;  
	export let showContent: boolean = false; // display result in component 
	export let content: string = ""; // result
    
	let myInput: HTMLPreElement;

	//onMount(() => {
	//	myInput.innerHTML = 'Nothing!';
	//});


	//let files: FileList;
	let loadInput: HTMLInputElement;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log("####",files);
	    content = "";
		for (const file of files) {
			if (config.DEBUG)
				console.log(`${file.name}: ${file.size} bytes`);
			readFile(file, myInput);
		}

	}


	// function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {

  function keydown(ev: KeyboardEvent) {
    if ([' ', 'Enter'].includes(ev.key)) {
      ev.preventDefault();
	  loadInput.click()
    }
  }

</script>

<button id="fileSelect" type="button" class="fileInput" style="border-width: 1px; padding-top: 0.5rem; padding-bottom: 0.5rem" 
		on:keydown={keydown} on:focus on:blur on:mouseenter on:mouseleave on:mouseover on:dragenter on:dragleave on:dragover on:drop>
	<label style="padding-left:.4rem; display: flex; flex-direction: column" tabIndex="0">
		{label}
		<input
		accept={ACCEPT}
		bind:files
		bind:this={loadInput}
		id="yaml"
		name="yaml"
		type="file"
		{multiple}
		on:change on:click 
		style="display:none" />
	</label>
</button>

{#if showResult}
	<div class="table-viewport">
		{#if files && files[0]}
			<table >
				<thead>
					<caption style="text-align:left; caption-side:top">Selected files</caption>
					<tr><th>Name</th><th>Size</th></tr>
				</thead>
				<tbody>
					{#each Array.from(files) as file}
						<tr><td>{file.name}</td><td>{file.size}</td></tr>
					{/each}
				</tbody>
			</table>
			<!-- <div style="white-space: pre-wrap; font-family:monospace;">content</div> -->
            {#if showContent}
    			<br/>
				<pre style='margin:.5rem; width=100%; height=10rem;' bind:this={myInput}></pre>
            {/if}
        {:else}
			<p>No file selected</p>
		{/if}
	</div>
{/if}


<style>
	p {
		margin:1rem;
		text-align: center;

	}
	pre {
		overflow-x: auto;
		white-space: pre-wrap;
		white-space: -moz-pre-wrap;
		white-space: -pre-wrap;
		white-space: -o-pre-wrap;
		word-wrap: break-word;
	}	

	.fileInput {
		position: relative;
		text-align: left;
		display: block;
	}

	caption {
		display: flex;
		text-align: left;
		padding:.25rem;
		font-size: 1.25rem;
		width: 100%;
		height: 100%;
		font-weight: 400;
	}

	table, th, td {
		text-align: left;
		border: 1px solid rgba(0, 0, 0, 0.2); 
		border-collapse: collapse;
		margin: 1rem;
		padding:.25rem;
	}
	
	.table-viewport {
		display: flex;
		
		/*overflow: hidden;
		position: relative;*/
	}

	/* TODO: share in style template */
	button {
        padding: .1rem .25rem .1rem .25rem;
        margin:  .1rem .2rem .1rem .2rem;
        border-radius: .25rem;
        cursor: pointer;
        /*font-weight: bold;*/
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        width: 25rem;
    }
    button:active {
        background-color: #efefef;
        box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0px 0px 0 rgba(0, 0, 0, 0.06);	
    }
</style>
