<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import Card from '../shared/Card.svelte';
    export let poll: object = {};
    $: totalVotes = poll.votesA + poll.votesB;
    const dispatch = createEventDispatcher();

    const vote = function(option: string, id: number){
        dispatch("vote", {option, id});
    }
</script>

<div>
    <Card>
        <h3>{poll.question}</h3>
        <p>Total Votes ({totalVotes})</p>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click|once={()=> {vote('a', poll.id)}}>
            <span>{poll.answer1} ({poll.votesA})</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click|once={()=> {vote('b', poll.id)}}>
            <span>{poll.answer2} ({poll.votesB})</span>
        </div>
    </Card>
</div>

<style>
  h3{
    margin: 0 auto;
    color: #555;
  }
  p{
    margin-top: 6px;
    font-size: 14px;
    color: #392620da;
    margin-bottom: 30px;
  }
  .answer{
    background: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover{
    opacity: 0.6;
  }
  span{
    display: inline-block;
    padding: 10px 20px;
  }
</style>