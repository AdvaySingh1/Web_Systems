<script lang="ts">
    /** @type {import('./$types').PageData} */
	export let data;
    const movies = data.movies; // extract movies from data

</script>

<h1>Protected Page</h1>

<ul>
    {#if movies}
        {#each movies as movie}
            <h1>{movie.original_title}</h1>
            <p>{movie.overview}</p>
        {/each}
    {/if}
</ul>