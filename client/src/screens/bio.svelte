<script>
export let params = {}
    import TopBar from '../components/topBar.svelte'
    import Bio from '../components/bio.svelte'
    import MySnip from '../components/mySnippets.svelte'
    import Background from '../components/bioBackgroundImage.svelte'


</script>

<style>
    /* your styles go here */
</style>

<TopBar />
<Bio pub = {params.pub} />
<Background/>
<MySnip pub = {params.pub} />
<!-- markup (zero or more items) goes here -->