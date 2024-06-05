<script lang="ts">
	export let people = [
    { name: 'yoshi', beltColor: 'black', age: 25, id: 1 },
    { name: 'mario', beltColor: 'orange', age: 45, id: 2 },
    { name: 'luigi', beltColor: 'brown', age: 35, id: 3 }
  ];

    let number;

    const handlePClick = (e, id) => {
       people = people.filter(person => person.id != id);
    }
</script>

<main>
    {#each people as person (person.id)}
        <div>
            <p>{person.name}'s faveriote beltColor is {person.beltColor} and age is {person.age}</p>
            <button class="deleter" on:click={(e) => handlePClick(e, person.id)}>delete</button>
            {#if person.beltColor == "black"}
                <p><strong>Black Belt.</strong></p>
            {/if}
        </div>
        {:else}
            <p>There's no people.</p>
    {/each}
    <div>


        <input type="number" title="Number" bind:value={number}>;
            {#if number > 10}
                <p>Number greater than 10</p>
            {:else if number > 5}
                <p>Number between 5 and 10</p>
            {:else}
                <p>Little number!</p>
            {/if}
    </div>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
        background-color: antiquewhite;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>