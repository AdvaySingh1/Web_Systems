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
    {/each}
</ul>

<style>

  .nav{
    margin-bottom: 40px;
  }
  ul{
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }
  li{
    margin: 0 16px;
    font-size: 18px;
    color: #555;
    cursor: pointer;
  }
  .active{
    color: #d91b42;
    border-bottom: 2px solid #d91b42;
    padding-bottom: 8px;
  }

</style>




