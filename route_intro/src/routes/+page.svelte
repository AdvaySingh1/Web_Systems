<script lang="ts">
    /** @type {import('./$types').PageData} */
	// export let data;
</script>

<main>
    <!-- <h1>{data.locals.some.height}</h1> -->
	<h1>SvelteKit Hooks</h1>
	<p>Let's learn how the handle hook works in SvelteKit!</p>
	<div class="button-container">
		<form action="?/login" method="POST">
			<button type="submit" class="btn btn-primary">Login</button>
		</form>
		<a href="/protected" class="btn btn-secondary">Protected</a>
	</div>
</main>