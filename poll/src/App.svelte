<script lang="ts">
	let name: string;
	import Header from "./container/Header.svelte";
	import Footer from "./container/Footer.svelte";
	import Tab from "./shared/Tab.svelte";
	import CreatePollsLog from './container/CreatePollsLog.svelte'; 
	//import ViewPolls from "src/container/ViewPolls.svelte";
	let tabs: Array<string> = ["Create Polls", "View Polls"];

	let currTab: string = "Create Polls";

	let toggleTab = (e) => {
		currTab = e.detail;
	}

	const handleAdd = (e) => {
		console.log(e.detail);
	}

</script>


<Header/>
<CreatePollsLog on:add={handleAdd}/> 

<Tab {tabs} {currTab} on:toggleTab={toggleTab}/>
<main>
	{#if currTab === "Create Polls"}
		something
	{:else}
		<!---<ViewPolls/>-->Something
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