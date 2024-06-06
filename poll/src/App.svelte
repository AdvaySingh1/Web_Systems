<script lang="ts">
	let name: string;
	import Header from "./container/Header.svelte";
	import Footer from "./container/Footer.svelte";
	import Tab from "./shared/Tab.svelte";
	let tabs: Array<string> = ["Create Polls", "View Polls"];
	let currTab: string = "Create Polls";

	let toggleTab = (e) => {
		currTab = e.detail;
	}

</script>


<Header/>

<Tab {tabs} {currTab} on:toggleTab={toggleTab}>
	<div slot ="create">
		Create coming in soon.
	</div>
	<div slot ="view">
		View coming in soon.
	</div>
</Tab>
<main>
	<h1>Hello There!</h1>
	<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi reprehenderit obcaecati molestiae ad quidem iusto doloremque totam est minus laboriosam tempore eos earum unde expedita, pariatur, possimus, dolorem in ea!</p>
</main>

<Footer/>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>