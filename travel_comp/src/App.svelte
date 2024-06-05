<script lang="ts">
	import Globe from './globe.svelte';
	import Model from './Model.svelte'
	let firstName = '';
	let lastName = '';
	let fullName = '';
	let color = '';


	// event handlers
	function changeColorBlue(e){
		color = 'blue';
	}
	const changeColor = (e) =>{
		color = e.target.value;
	};

	//reactive values
	$: fullName = `${firstName} ${lastName}`;
	// $: {
	// 	console.log(color);
	// };

</script>

<Model />

<main>
	<h1 style="background-color:{color}">Hello {fullName}!</h1>
	<p>This the color is {color}.</p>
	<button on:click={changeColorBlue}>Change color</button>
	<!---<input type="text" on:input={changeColor}>-->
	<input title="color" type="text" bind:value={color}>
	<label for="fn">First Name</label>
	<input id="fn"title="First Name" type="text" bind:value={firstName}>
	<label for="ln">Last Name</label>
	<input id="ln"title="Last Name"type="text" bind:value={lastName}>

</main>

<Globe />


<style>
	main {
		text-align: center;
		padding: 10em;
		max-width: 240px;
		margin: 0 auto;
		background-color: color;
		height: 300px;

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