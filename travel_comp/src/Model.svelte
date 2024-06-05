<script lang="ts">
    export let showModel = false;
    export let promoMsg = 'default msg';
    export let isPromo = false;
</script>



{#if showModel}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="backdrop" on:click|self >
        <div class="model" class:promo={isPromo}>
            <!-- <p>{promoMsg}</p> -->
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .backdrop{
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.8);
    }
    .promo:hover{
        cursor: grab;
    }
    .model{
        padding: 10px;
        border-radius: 10px;
        max-width: 400px;
        margin: 10% auto;;
        text-align: center;
        background: white;
    }
    .promo{
        color:white;
        background-color: chocolate;
    }

</style>