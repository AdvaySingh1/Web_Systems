<script lang='ts'>
    import { createEventDispatcher } from "svelte";
    export let tabs : Array<string>;
    export let currTab: string;
    let dispatch = createEventDispatcher();

</script>


<ul class="nav">
    {#each tabs as tab}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li class:active={tab === currTab} on:click={dispatch("toggleTab", tab)}>{tab}</li>
        {#if tab === currTab}
            <p>{tab} coming in soon.</p>
        {/if}
    {/each}
</ul>

<style>
    .active{
        color:darkslateblue;
        text-decoration: underline;
    }
</style>




