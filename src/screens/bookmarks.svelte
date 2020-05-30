<script>
import {db} from '../blue'
    import TopBar from '../components/topBar.svelte'
    import Snippet from '../components/snippet.svelte'
    // your script goes here
    let pub
        let current = 'Snip';
        let active = false
        let data = [],
            liked = []

            db.user(pub).get('bookmarks').map().on(u => 
{                        
        db.get("devnet").get('snippets').get(u.postID).on(u => {
            data.push(u)
            console.log(data)
            data = data

        })}
    )
</script>

<style>
.bookmarks{
    color: white;
    font-size: 3rem;
    font-weight: bold;
}
</style>

<!-- markup (zero or more items) goes here -->

<TopBar />

<h1 class="bookmarks ml-32 text-base mt-5">Bookmarks</h1>

<div class=" z-0 mt-10 absolute w-full h-auto">
{#each data as s}
    <Snippet message={s.dis}, username={s.alias}, id={s.postID} pub={pub} />
{/each}
</div>
