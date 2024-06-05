<script lang="ts">
    let name;
    let beltColor;
    let age;
    let skills = [];
    const handleSubmit = () => {
        console.log(name, beltColor, age);
    }
</script>

<!--{#if showForm}
     svelte-ignore a11y-click-events-have-key-events 
    <div class="backdrop" on:click|self >
        <div class="mainMsg">
            <slot name="header"></slot>
            <slot></slot>
        </div>
    </div>
{/if}-->
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="name" bind:value={name}>
        <input type="number" placeholder="age" bind:value={age}>
        <label for="skills">Skills</label>
        <input type="checkbox" bind:group={skills} value="cool">Being Cool<br>
        <label for="belts">Belt Color</label>
        <select bind:value={beltColor}>
            <option value="orange">Orange</option>
            <option value="brown">Brown</option>
            <option value="black">Black</option>
            <option value="white">White</option>
        </select>
        <button>Add Ninja</button>
    </form>

    <style>

    </style>

