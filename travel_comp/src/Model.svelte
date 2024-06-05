<script lang="ts">
    let showModel = true;
    let isPromo = true;
</script>



{#if showModel}
    <div class="backdrop">
        <div class="model" class:promo={isPromo}>
            <p>Sign up for offers!</p>
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