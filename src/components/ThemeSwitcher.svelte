<script lang="ts">
    import Switch from '$components/Switch.svelte';
    export let theme: string; // TODO read onmount

    let themeToggle: HTMLDivElement;

    // = document.getElementById("theme__switcher");
    //const bodyEl = document.body;

    // Function to detect user's preferred theme


    // Run the function to detect the user's preferred theme
    // nMount () { detectPreferredTheme(); }

 

    // Function to toggle the theme between light and dark

    function toggleTheme() {
        setTheme(bodyEl.classList.contains("dark") ? "light" : "dark");
    }

    function setTheme(theme) {
        bodyEl.classList.toggle("dark", theme === "dark");
        bodyEl.classList.toggle("light", theme !== "dark");

        themeToggle.style.filter = theme === "dark" ? "invert(75%)" : "none";

        // Setting the theme in local storage
        // localStorage.setItem("theme", theme);
    }

    // Check if the theme is stored in local storage
    // const storedTheme = localStorage.getItem("theme");
    // if (storedTheme) {
    //     setTheme(storedTheme);
    // }

    function detectPreferredTheme() {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        // Getting the value from local storage
        // const storedTheme = localStorage.getItem("theme");

        // setTheme(prefersDarkMode && storedTheme !== "light" ? "dark" : "light");
    }

</script>

<div id="theme__switcher" >
    <Switch {...$$restProps} bind:value={theme} label="" options={['light', 'dark']} fontSize={12}/>
</div> <!-- bind:this={themeToggle} --> 

<style>
    #theme__switcher { cursor: hand; }

    .dark {
        background: #1f1f1f;
        color: #fff;
    }

    .light {
        background: #fff;
        color: #333;
    }
</style>