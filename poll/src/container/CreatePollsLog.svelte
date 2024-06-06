<script lang="ts">
    import {createEventDispatcher} from "svelte";
    //import Button from "/src/shared/Button.svelte";
    let polls= {question: string = '', answer1: string = '', answer2: string = ''};
    //let errors = {question: string = '', answer1: string = '', answer2: string = ''};

    dispatch = createEventDispatcher();

    //TODO add isvalid.

    const handleSubmit = ()=>{
        //console.log(polls);
        dispatch("add", polls);
    }
</script>

<form on:submit={handleSubmit}>
    <div>
        <label for="question">Enter a question</label>
        <input type="text" bind:value={polls.question} id="question">
    </div>
    <div>
        <label for="answer1">Option one</label>
        <input type="text" bind:value={polls.answer1} id="answer1">
    </div>
    <div>
        <label for="answer2">Option two</label>
        <input type="text" bind:value={polls.answer2} id="answer2">
    </div>
    <!---<Button>Submit Poll</Button>-->
    <button>submit</button>
    
</form>

<style>
    form{
      width: 400px;
      margin: 0 auto;
      text-align: center;
    }
    div{
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
   /* .error{
      font-weight: bold;
      font-size: 12px;
      color: #d91b42;
    }*/
  </style>