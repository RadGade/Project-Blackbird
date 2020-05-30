<script>
    // your script goes here
    export let pub;
        let current = 'Snip';
        let active = false
        import {db} from '../blue'
        import Snippet from './bioSnippet.svelte'
        let data = [],
            liked = []

            db.user(pub).get('snippets').map().on(u => 
{                        
        db.get("devnet").get('snippets').get(u.postID).on(u => {
            data.push(u)
            data = data

        })}
    )
    db.user(pub).get("likes").map().on(u => 
{                        
    console.log(u)
        db.get("devnet").get('snippets').get(u.postID).on(u => {
            liked.push(u)
            liked = liked

        })}
    )
</script>

<style>
    /* your styles go here */
    .like{
    fill: #777777;
}
.like-active{
    fill: #FE657B;
}
    .con{
        background: rgb(52, 56, 63);
        height: 75%;
         overflow:auto;
         max-height:100%;
        width: 50%;
border-radius: 8px 8px 0px 0px;       
 overflow-x: hidden;
        transition: 0.5s;
    }
    .nav{
        background: #3C424B;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
border-radius: 8px 8px 0px 0px;
position: static;
    }

    .active{
        font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 14px;

color: #FE657B;
text-shadow: -4px -4px 10px rgba(254, 101, 123, 0.25), 4px 4px 10px rgba(254, 101, 123, 0.25);
    }
        .nav-op{
        font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 14px;
color: #777777;}

     .con::-webkit-scrollbar {
	 width: 0;
}
    .pCon{
        background: #3C424B;
        min-height: 11rem;
        height: auto;
        color: #777777;
    }
    .header .timestamp {
	 color: rgba(255, 255, 255, 0.2);
	 font-size: 0.75rem;
	 font-weight: 400;
	 letter-spacing: 0;
	 margin-left: 0.3rem;
}

.header {
	 margin-left: 60px;
	 padding-top: 3px;
	 color: #fff;
	 height: 1.3em;
}
</style>

<!-- markup (zero or more items) goes here -->

<div class="con float-right absolute right-0 bottom-0 mr-20">

    <div class="nav h-12 w-full">
        <p 	class="{current === 'Snip' ? 'active ml-6 mt-6 mb-0 absolute' : 'nav-op ml-6 mt-6 mb-0 absolute'}"
	on:click="{() => current = 'Snip'}">Snippets</p>
        <p class="{current === 'Likes' ? 'active ml-24 mt-6 mb-0 absolute' : 'nav-op ml-24 mt-6 mb-0 absolute'}"
	on:click="{() => current = 'Likes'}">Likes</p>
    </div>

{#if current === "Snip"}
     <!-- content here -->
     {#each data as s}
<Snippet message={s.dis}, username={s.alias}, id={s.postID} pub={pub} />
{/each}
{:else}
     {#each liked as s}
<Snippet message={s.dis}, username={s.alias}, id={s.postID} pub={pub} />
{/each}
{/if}

</div>