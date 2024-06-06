<script lang="ts">
    import PollDetails from './Poll.svelte';
    export let polls: array<object> = [];

    let logger = (val) =>{
        console.log(val);
    }
  </script>
  
  <div class="poll-list">
    {#each polls as poll (poll.id)}
      <PollDetails {poll} on:vote|once/>

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