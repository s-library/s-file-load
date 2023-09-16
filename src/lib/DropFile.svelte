<script lang="ts">
  	import { createEventDispatcher } from 'svelte';
  	import { accept, boxCSSsize } from '$lib/common';


	  // bind to files from JS
  	let files: FileList | undefined = undefined;

    //export let value: string = '';
    export let fileType = "Any text file"
    export let content: string = 'No file uploaded yet'; // content of the selection
        
    export let boxSize = "medium";
    let normalColor = '#f4ed2a';
	  let activeColor = '#FF5555';

    export let theme: boolean = false;
	  // $: cssVarStyles = `--note-color:${noteColor}; --note-bg-color:${noteBgColor}`;

    export let filesArray: [File] = [];
    let input: HTMLInputElement;
  	const dispatch = createEventDispatcher();
    let background = "#F9FAFB";
    
    function keydown(ev: KeyboardEvent) {
      if ([' ', 'Enter'].includes(ev.key)) {
        ev.preventDefault();
        //background-color
        dispatch('message', { text: 'open'});
        input.click();
      }
    }

    function dropHandler (event) {
      filesArray = [];
      event.preventDefault();
      if (event.dataTransfer.items) {
        console.log("drop dataTransfer.items");
        let files = [...event.dataTransfer.items];
        files.forEach((item, i) => {
          // if (data[i].kind === "string" && data[i].type.match("^text/plain"))
          if (item.kind === 'file') {
            const file = item.getAsFile();
            console.log(`… file[${i}].name = ${file.name}`, file);
            filesArray.push(file);
          }
          //content = filesArray;
        });
      } else {
        if (event.dataTransfer.files) {
          console.log("drop dataTransfer.files");
          let files = event.dataTransfer.files;
          let file = files && files[0];
          if (file) {
            console.log("drop api2",file);
            filesArray = [file]
          }  
        } else {
          console.log("drop api?",event);
        }
      }
      console.log("drop",filesArray);
      filesArray = filesArray;
    };

    // reactive binding to HTML input element
    $: if (files) {
		  // Note that `files` is of type `FileList`, not an Array:
		  // https://developer.mozilla.org/en-US/docs/Web/API/FileList
		  // console.log(files);
      // background = "green"
	    content = "";
      filesArray = []
      for (const file of files) {
          // if (Config._DEBUG)
          console.log(`${file.name}: ${file.size} bytes`);
          filesArray.push(file)
        //readFile(file);
      }

  	}

    // alternative
    //function changeHandler (event) {
    //  const files = event.target.files;
    //};

    function showFiles () {
      console.log("show",filesArray);

      if (filesArray) {
        if (filesArray.length === 1) return filesArray[0].name;
        let ret = "";
        for (const file of filesArray) {
          if (ret) ret += ', '
          ret += `${filesArray.name}`;
        }
        ret = filesArray.length+" files: " + ret;
        //if (ret.length > 40)
        //  ret = ret.slice(0, 40) + '...';
        return ret // .slice(2);
      } else return "";
    }

    function fileDetail (file) {
      return `${file.name} ${file.path} ${file.size} ${file.type} ${file.lastModifiedDate}`
    } 

    function dragOverEvent(event) {
      event.preventDefault()
    }
  </script>

<!-- on:change={changeHandler} -->
<div class="drop-section">
    <button type="button" class="drop-area" style="{theme?background='black':background='white'};background-color={background};{boxCSSsize[boxSize]}"
          on:keydown={keydown} 
          on:drop={dropHandler} 
          on:dragover={dragOverEvent}
          on:focus on:blur on:mouseenter on:mouseleave on:mouseover on:dragenter on:dragleave >
    <label class="drop-label" tabIndex="0">
      <slot>
        {#if filesArray.length > 0}
          <svg aria-hidden="true" class="svg-style" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13L14 17M14 13L10 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" />
          </svg>
          <p class="drop-area-nofile">{showFiles(filesArray)}</p>
        {:else}
          <svg aria-hidden="true" class="svg-style" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
               viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" />
            <polyline points="7.9 8.7 12 4.7 16.1 8.7" />
            <line x1="12" x2="12" y1="16.3" y2="5.8"/>
          </svg>
          <p class="drop-area-nofile"><span style="font-weight:600; ">Click to upload</span> or drag and drop</p>
          <p class="drop-area-nofile-small">{fileType}</p>
        {/if}
      </slot>
      <input {...$$restProps} bind:files bind:this={input} on:change on:click type="file" style="display: none"/>
    </label>
  </button>
  {content}
</div>

<style>
    .drop-section {
      margin: 0;
    }
    .drop-area {
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center; 
      border: 5px solid #aaa;
      border-radius: 0.5rem; 
  		box-shadow: 0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1);
      background-color: var(--background,#F9FAFB);  
      height: 12rem; 
      cursor: pointer; 
    }
    /* style:background-color={color}
       colorbackground-color: var(--color, {color}); */
    .drop-area:hover {
       background-color: #F3F4F6; 
    }
    .drop-label {
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      width: 100%;
      padding: 0;
    }
    .svg-style {
      margin-bottom: 0.75rem; 
      width: 2.5rem; 
      height: 2.5rem; 
      color: #9CA3AF; 
    }
    .drop-area-nofile {
      margin-bottom: 0rem; 
      padding-bottom: 0rem; 
      font-size: 0.875rem;
      line-height: 1.25rem; 
      color: #6B7280; 
    }
    .drop-area-nofile-small {
      padding: 0;
      border: 0;
      font-size: 0.75rem;
      line-height: 1rem; 
      color: #6B7280; 
    } 
</style>
