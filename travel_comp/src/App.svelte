<script lang="ts">
	import Globe from './globe.svelte';
	import Model from './Model.svelte'
	import Form from './Form.svelte'
	let firstName = '';
	let lastName = '';
	let fullName = '';
	let color = '';
	let showModel = false;
	let showForm = false;

	//event forwarding
	const togglePromo = () =>{
		showModel = !showModel;
	};

	// slots


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


<Model promoMsg="OOO look who it is" isPromo={true} {showModel} on:click={togglePromo}/>

<Form {showForm} on:click={() => showForm = !showForm}>
	<form>
		<input type="text" placeholder="name">
		<input type="text" placeholder="belt">
		<input type="number" placeholder="age">
	</form>
	<div slot="header">
		<h2>Add people</h2>
	</div>
</Form>


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
	<div class="model_btn">
		<button on:click|once={togglePromo}>Show Promo</button>
		<button on:click={() => showForm = !showForm}>Show Form</button>
	</div>


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

	/*.model_btn {
		position: absolute;
		right: 2rem;
	}*/

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>