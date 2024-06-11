<script lang='ts'>
    import {fade} from 'svelte/transition';
    import PollStore from '../store/PollStore.ts';
    import {createEventDispatcher} from 'svelte';
    import Button from '../shared/Button.svelte';
    let polls = {question: String =  '', answer1: String =  '', answer2: String =  ''};
    let errors = {question: String =  '', answer1: String =  '', answer2: String =  ''};

    let dispatch = createEventDispatcher();

    

    const isValid = () => {
        let valid: bool = true;
        if (polls.question.length < 5){
            errors.question = polls.question + ' is invalid';
            valid = false;
        }
        else{
            errors.question = '';
        }
        if (polls.answer1.length < 1){
            error.answer1 = 'Cannot be empty';
            valid = false;
        }
        else{
            errors.answer1 = '';
        }
        if (polls.answer2.length < 1){
            error.answer2 = polls.answer2 + 'Cannot be empty';
            valid = false;
        }
        else{
            errors.answer2 = '';
        }

        return valid;
    }

    const handleAdd = () => {
        if (isValid()){
            PollStore.update((currentPolls) =>{
                return([{...polls, votesA: 0, votesB: 0, id: Math.random()}, ...currentPolls]);
            });

            dispatch('add');
        }
    }
</script>


<form in:fade={{ delay: 250, duration: 300 }} on:submit|preventDefault={handleAdd}>
    <div>
        <label for="question">Question</label>
        <input type="text" id="question" bind:value={polls.question}>
        <div class="error">{errors.question}</div>
    </div>
    <div>
        <label for="a1">Option One</label>
        <input type="text" id="a1" bind:value={polls.answer1}>
        <div class="error">{errors.answer1}</div>
    </div>
    <div>
        <label for="a2">Option Two</label>
        <input type="text" id="a2" bind:value={polls.answer2}>
        <div class="error">{errors.answer2}</div>
    </div>
    <Button type={'secondary'}>Add</Button>
</form>

<style>
    form{
      width: 400px;
      margin: 0 auto;
      text-align: center;
    }
    div:not(.error){
      margin: 18px auto;
    }
    input{
      width: 100%;
      border-radius: 6px;
    }
    label{
      margin: 10px auto;
      text-align: left;
    }
    .error{
      font-weight: bold;
      font-size: 12px;
      color: #d91b42;
    }
  </style>