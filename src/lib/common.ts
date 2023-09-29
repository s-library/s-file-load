    /*** Parent Element for DropFile and LoadFile
     * Define common properties and styles
	 * https://svelte.dev/examples/file-inputs
	 * TODO: possibility to use a store as: import { content } from '$lib/store'; // store file content
     * Features:
     *  - drop or select
     *  - return files or content
     *  - no dependencies on CSS - opinionated look
     */

    // Default accept to text files
	export const ACCEPT:string = "text/plain, text/csv, text/html, text/css, application/xml, text/xml, text/yaml, text/javascript, application/json, application/rtf, text/plain;charset=UTF-8";

    export const boxCSSsize:any = {
        small: 'width: 16rem; height: 10rem',
        medium: 'width: 24rem; height: 12rem',
        big: 'width: 32rem; height: 16rem',
        xbig: 'width: 56rem; height: 28rem'
    };
	//export const config = {DEBUG: true}
    class Config {
		DEBUG;
		constructor () {
			this.DEBUG = true;
		}
		/**
		 * @param {boolean} value
		 */
		set (value:boolean ) { this.DEBUG = value; console.log(this.DEBUG) } 
		set_debug () { this.DEBUG = true; console.log(this.DEBUG) } 
		reset_debug () { this.DEBUG = false; console.log(this.DEBUG) }
		get () { return this.DEBUG }  
	}
	
	export const config = new Config();

    //const text = await file.text();
	/**
 	* @param {File} file
 	* @param {HTMLPreElement} content
 	*/
	export async function readFile (file: File, content: HTMLPreElement) {
        content.innerHTML = "";
        //return await file.text();
		if (file) {
			var reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = function (evt) {
				if (evt && evt.target && evt.target.result) {
                    content.innerHTML += evt.target.result.toString() + "\n\n";
				    console.log("INSIDE 1",        content.innerHTML )
                }
				else {
					// content = "";
					// content.set(""); // same as $content = ""
				    console.log("INSIDE 2",evt)
				}
			}
			reader.onerror = function (evt) {
				content.innerHTML = "### Error reading file " + file.name;
			}
		}
	}
	