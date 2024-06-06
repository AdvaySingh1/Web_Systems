<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import PollDetails from './Poll.svelte';
    //export let polls: array<object> = [];
    import PollStore from '../store/PollStore.ts';
    let polls: array<object> = [];

    // onMount(() => {
    //     const unsub = PollStore.subscribe((data) => {
    //         polls = data;
    //     });
    // });
    
    // const unsub = PollStore.subscribe((data) => {
    //     polls = data;
    // });

    // onDestroy(() =>{
    //     console.log('destroyed');
    //     unsub();
    // })

    

    let logger = (val) =>{
        console.log(val);
    }
  </script>
  
  <div class="poll-list">
    {#each $PollStore as poll (poll.id)}
      <PollDetails {poll}/>

        <!-- {:else}
        There are no polls as of now. -->
    {/each}
  </div>
  
  <style>
    .poll-list{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
    }
  </style>