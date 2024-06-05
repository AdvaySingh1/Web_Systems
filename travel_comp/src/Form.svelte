<script lang="ts">
    import { createEventDispatcher } from "svelte"
    let name;
    let beltColor;
    let age;
    let skills = [];
    let bonsai = false;

    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        let person = {
            name,
            beltColor,
            age,
            skills,
            id: Math.random()
        }
        dispatch("addPerson", person);
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
        <input type="checkbox" bind:group={skills} value="hot">Being Hot<br>
        <input type="checkbox" bind:group={skills} value="both">Being Both<br>
        <input type="checkbox" bind:checked={bonsai}>Bonsai<br>
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

