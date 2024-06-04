<script lang="ts">
	import Globe from './globe.svelte';
	export let name: string;
</script>

<nav id="mynav">
	<ul>
	  <li><a href="#intro" class="active">Introduction</a></li>
	  <li><a href="#first">About Me</a></li>
	  <li><a href="#second">Projects</a></li>
	  <li><a href="#cta">Interests</a></li>
	</ul>
  </nav>
<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<Globe />


<style>
	main {
		text-align: center;
		padding: 10em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #1f1321d6;
		height: 1200px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	#mynav {
	/* We want absolute positioning because we want the nav bar to be relative to its ancestor, the "wrapper" id container */
	position: absolute;
	width: 1200em;
	right: 15px;
	
	/* You can use calc in CSS to calculate numbers, just like a calculator */
	max-width: calc(100% - 4em);
	padding: 1em;
	background-color: #f7f7f7;
	
	/* We want the top left and top right corner to be soft corners */
	border-top-left-radius: 10em;
	border-top-right-radius: 10em;
	cursor:grabbing;
	text-align: center;
	}
	#mynav a {
	color: #636363;
	}
	#mynav a:hover {
	color: #636363;
	}
	#mynav ul {
	margin: 0;
	padding: 0;
	
	/* No bullets in a list*/
	list-style: none;
	}
	#mynav ul li {
	display: inline-block;
	margin: 0 0.35em;
	padding: 0;
	/* Center the text vertically */
	vertical-align: middle;
	}
	#mynav ul li a {
	display: inline-block;
	height: 2.25em;
	line-height: 2.25em;
	padding: 0 1.25em;
	border: 0;
	border-radius: 8px;
	box-shadow: inset 0 0 0 1px transparent;
	text-decoration: none;
	}
	#mynav ul li a:hover {
	background-color: rgba(222, 222, 222, 0.25);
	}
	#mynav ul li a:active {
	background-color: #ffffff;
	box-shadow: none;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>