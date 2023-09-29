<script lang="ts">
    // based on:
    // Inclusive Components by Heydon Pickering https://inclusive-components.design/toggle-button/
    // On Designing and Building Toggle Switches by Sara Soueidan https://www.sarasoueidan.com/blog/toggle-switch-design/
    // and this example by Scott O'hara https://codepen.io/scottohara/pen/zLZwNv 
    // https://svelte.dev/repl/d65a4e9f0ae74d1eb1b08d13e428af32?version=3.35.0


    export let label: string;
    export let options: Array<string> = [];
	export let fontSize: number = 16;
	export let value: string = 'on';

    let checked = true;

	const uniqueID = Math.floor(Math.random() * 100);

	function onSwitch(e:Event){
        console.log(value)
    }
</script>

<div class="s--multi">
    <div role='radiogroup'
				 class="group-container"
				 aria-labelledby={`label-${uniqueID}`}
				 style="font-size:{fontSize}px" 
				 id={`group-${uniqueID}`}>
        <div class='legend' style="font-size:{fontSize+2}px"  id={`label-${uniqueID}`}>{label}</div>
        {#each options as option}
            <input type="radio" id={`${option}-${uniqueID}`} value={option} bind:group={value} on:click={onSwitch} />
            <label for={`${option}-${uniqueID}`}>
                {option}
            </label> 
        {/each}
    </div>
</div>


<style>
	:root {
		--accent-color: CornflowerBlue;
		--gray: #ccc;
	}

    .group-container {
        border:none;
        padding:0;
        margin:0;
        display:flex;
        white-space:nowrap
    }

    .legend {
        margin-right: .5rem;
        margin-top: .1rem;
        margin-left: .2rem;
    }
 
    /* Multi Design Option */

    /* Based on suggestions from Sara Soueidan https://www.sarasoueidan.com/blog/toggle-switch-design/
    and this example from Scott O'hara https://codepen.io/scottohara/pen/zLZwNv */

    .s--multi .group-container {
        border: none;
        padding: 0;
        white-space: nowrap;
    }

    /* .s--multi legend {
    font-size: 2px;
    opacity: 0;
    position: absolute;
    } */

    .s--multi label {
        display: inline-block;
        line-height: 1.6;
        position: relative;
        z-index: 2;
    }

    .s--multi input {
        opacity: 0;
        position: absolute;
    }

    .s--multi label:first-of-type {
        padding-right: 5em;
    }

    .s--multi label:last-child {
        margin-left: -5em;
        padding-left: 5em;
    }

    /*  focus   */ 
    .s--multi:focus-within label:first-of-type:after {
        box-shadow: 0 0px 1px black;
        border-radius: 1.5em;
    }
    

    /* making the switch UI.  */
    .s--multi label:first-of-type:before,
    .s--multi label:first-of-type:after {
        content: "";
        height: 1.25em;
        overflow: hidden;
        pointer-events: none;
        position: absolute;
        vertical-align: middle;
    }

    .s--multi label:first-of-type:before {
        border-radius: 100%;
        z-index: 2;
        position: absolute;
        width: 1.2em;
        height: 1.2em;
        background: #fff;
        top: 0.2em;
        right: 1.2em;
        transition: transform 0.3s;
    }

    .s--multi label:first-of-type:after {
        background: var(--accent-color);
        border-radius: 1em;
        margin: 0 1em;
        transition: background .2s ease-in-out;
        width: 3em;
        height: 1.6em;
    }

    .s--multi input:first-of-type:checked ~ label:first-of-type:after {
        background: var(--gray);
    }

    .s--multi input:first-of-type:checked ~ label:first-of-type:before {
        transform: translateX(-1.4em);
    }

    .s--multi input:last-of-type:checked ~ label:last-of-type {
        z-index: 1;
    }

    .s--multi input:focus {
        box-shadow: 0 0px 1px black;
        border-radius: 1.5em;
    }


</style>