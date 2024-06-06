<script lang="ts">
	let name: string;
	import Header from "./container/Header.svelte";
	import Footer from "./container/Footer.svelte";
	import Tab from "./shared/Tab.svelte";
	import PollsView from './container/PollsView.svelte';
	import PollsCreate from './container/PollsCreate.svelte';

	let tabs: Array<string> = ['Create Polls', 'View Polls'];
	


	let currTab: string = "Create Polls";

	let toggleTab = (e) => {
		currTab = e.detail;
	}

	const handleAdd = (e) => {
		currTab = 'View Polls';
	}

	// const handleVote = (e) => {
	// 	const {option, id} = e.detail;
	// 	let copiedPolls = [...polls];
	// 	let upvotedPoll = copiedPolls.find(poll => poll.id == id);
	// 	if(option === 'a'){
	// 		upvotedPoll.votesA++;
	// 	}
	// 	if(option === 'b'){
	// 		upvotedPoll.votesB++;
	// 	}
	// 	polls = copiedPolls;
		
	// }
	// let logger = (val) =>{
    //     console.log(val);
    // }


</script>


<Header/>
<Tab {tabs} {currTab} on:toggleTab={toggleTab}/>
<main>
	{#if currTab === "Create Polls"}
		<PollsCreate on:add={handleAdd}/>
	{:else}
		<PollsView/>
	{/if}
</main>


<Footer/>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>