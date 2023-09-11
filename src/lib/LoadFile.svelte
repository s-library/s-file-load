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
	// https://svelte.dev/examples/file-inputs
	//	import { content } from '$lib/store'; // store file content

	export let multiple: boolean = false;
	export let showResult: boolean = false; // display result in component 
	export let showContent: boolean = false; // display result in component 
	export let content: string = ""; // result
    
	let files: FileList;
	let loadInput: HTMLInputElement;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		// console.log(files);

	    content = "";
		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
			readFile(file);
		}

	}

	function readFile (file: Blob) {
		if (file) {
			var reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = function (evt) {
				if (evt && evt.target && evt.target.result) {
					content += evt.target.result.toString() + "\n\n";
				}
				else {
					// content = "";
					// content.set(""); // same as $content = ""
				}
			}
			reader.onerror = function (evt) {
				content += "### Error reading file " + file.name;
			}
		}
	}
	
	// handle customized button
	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
		loadInput.click()
	}
</script>

<div class="fileInput">
	<input
		accept="application/x-yml, text/yaml"
		bind:files
		bind:this={loadInput}
		id="yaml"
		name="yaml"
		type="file"
		{multiple}
		style="display:none" />
	<button on:click={handleClick} id="fileSelect" type="button">Select a YAML file to load</button>
	<!-- 
	<input
		accept="application/x-yml, text/yaml"
		bind:files
		id="yaml"
		name="yaml"
		type="file"
		{multiple}
		class="visually-hidden" />
	<label for="yaml">Select some files</label>
	-->
</div>

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
			<p>{files[0].name}</p>
			<!-- <div style="white-space: pre-wrap; font-family:monospace;">content</div> -->
            {#if showContent}
    			<pre style='margin:.5rem; width=100%; height=10rem;'>{content}</pre>
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
/* 	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		border: 1px;
	}

	label {
		outline: thin dotted;
		border: 1px;
		padding: .5rem;
	} */

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
		width: 100%;
		height: 100%;
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
