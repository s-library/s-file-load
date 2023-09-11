<script lang="ts">
    import LoadFile from '$lib/LoadFile.svelte';

    let content = "No file uploaded yet";	

    function onChangeHandler(e: Event): void {
	    console.log('file data:', e);
    }   
 </script>

<div class=section>
    <LoadFile bind:content={content} showResult={false} showContent={false} multiple={false} on:change={onChangeHandler} />
    {content}
</div>
