<script lang="ts">
    import { fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
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
  
  <div class="poll-list" slide>
    {#each $PollStore as poll (poll.id)}
    <div in:fade={{ delay: 250, duration: 300 }} out:scale|local animate:flip={{duration: 500}}>
        <PollDetails {poll}/>
    </div>

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