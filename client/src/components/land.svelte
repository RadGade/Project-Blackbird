<script>
    // your script goes here
        import { push } from 'svelte-spa-router';

</script>

<style>
    /* your styles go here */
    h1{
        left: 84px;
        top: 131px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 900;
        font-size: calc(50px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        line-height: 84px;

        color: #FFFFFF;
    }

.con{
    margin-top: 5%;
    margin-left: 5%;
    overflow: hidden;
}
</style>

<!-- markup (zero or more items) goes here -->
<div class="con">
    <h1>Welcome</h1>
    <button class="shadow bg-purple-500 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-4 rounded" on:click={() => {
    push('/auth')
}}>Lets Go</button>
</div>
