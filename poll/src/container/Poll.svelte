<script lang="ts">
    import PollStore from '../store/PollStore.ts';
    import Button from '../shared/Button.svelte';
    import { tweened } from 'svelte/motion';
    //import {createEventDispatcher} from 'svelte';
    import Card from '../shared/Card.svelte';
    export let poll: object = {};
    $: totalVotes = poll.votesA + poll.votesB;
    $: percents = [Math.floor(100 * poll.votesA / totalVotes) || 0, Math.floor(100 * poll.votesB/ totalVotes) || 0];
    let voted: bool = false;
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);
    $: tweenedA.set(percents[0]);
    $: tweenedB.set(percents[1]);
    //const dispatch = createEventDispatcher();

    let handleDelete = (id: number) => {
      // callback function is updating
      PollStore.update((polls) => {
        return (polls.filter((polls) => polls.id != id));
      });
    }

    let voteA = false;

    const vote = function(option: string, id: number){
        if (!voted){
          PollStore.update((polls) =>{
            let copiedPolls = [...polls];
            let upvotedPoll = copiedPolls.find(poll => poll.id == id);
            if(option === 'a'){
              upvotedPoll.votesA++;
            }
            if(option === 'b'){
              upvotedPoll.votesB++;
            }
            return copiedPolls;
          })
		      
        }
        voted = true;
    }


</script>

<div>
    <Card>
        <h3>{poll.question}</h3>
        <p>Total Votes ({totalVotes})</p>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click|once={() => {vote('a', poll.id)}}>
            <div class="percent percent-a" style="width:{$tweenedA}%"></div>
            <span>{poll.answer1} ({poll.votesA})</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="answer" on:click|once={()=> {vote('b', poll.id)}}>
            <div class="percent percent-b" style="width:{$tweenedB}%"></div>
            <span>{poll.answer2} ({poll.votesB})</span>
        </div>
        <div class="delete">
          <Button flat={true} on:click={() => handleDelete(poll.id)}>Delete</Button>
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
  .percent {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }

  .percent-a {
    background: rgba(217,27,66,0.2);
    border-left: 4px solid #d91b42;
  }
  .percent-b {
    background: rgba(69,196,150,0.2);
    border-left: 4px solid #45c496;
  }
  .delete {
    text-align: center;
    margin-top: 30px;
  }
</style>