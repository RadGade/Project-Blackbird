<script>
  export let username, message, id, pub, uuid
  import { like, db, unlike, bookmark, unbookmark } from '../blue/blue'

  import { replace, location } from 'svelte-spa-router'
  let num
  let active, bookmarked
  db.get('devnet')
    .get('likes')
    .get(id)
    .on((u) => {
      num = u
      console.log(u)
      num = num
    })

  db.user(pub)
    .get('likes')
    .map()
    .on((u) => {
      if (u.postID == id) {
        active = true
      }
    })

  db.user(pub)
    .get('bookmarks')
    .map()
    .on((u) => {
      if (u.postID == id) {
        bookmarked = true
      }
    })
</script>

<style>
  .pCon {
    background: #3c424b;
    transition: 1s;
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
  .like {
    fill: #777777;
  }
  .like-active {
    fill: #fe657b;
  }

  .bookmark {
    fill: #777777;
  }
  .bookmark-active {
    fill: rgb(101, 167, 254);
    stroke: rgb(101, 167, 254);
  }
</style>

<div class="pCon w-1/2 rounded-md mt-12 mb-12 ml-32 h-auto pt-4">
  <div
    class="profile-pic h-10 w-10 bg-gray-400 ml-4 mt-4 rounded absolute"
    on:click={() => {
      replace('/bio/' + uuid)
    }} />
  <div class="header mt-4 absolute pl-2">
    @{username}
    <span class="timestamp">Today at 6:10 PM</span>
  </div>
  <div class="mt-20 h-auto ml-4 w-11/12 text-justify pb-3">
    <p>{message}</p>
  </div>
  <div
    on:click={() => {
      if (!active) {
        active = true
        like(id).then(console.log)
      } else {
        active = false
        unlike(id).then(console.log)
      }
    }}
    class="bg-transparent p-0 border-0 inline-flex items-center justify-center
    ml-4 pb-3">
    <svg
      id="like"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      class={active === true ? 'like-active w-5 h-5' : 'like w-5 h-5'}
      viewBox="0 0 24 24">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78
        7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>

    <p class=" ml-2">{num}</p>
  </div>

  <div
    on:click={() => {
      if (!bookmarked) {
        bookmark(id).then(() => (bookmarked = true))
      } else {
        unbookmark(id).then(() => (bookmarked = false))
      }
    }}
    class="bg-transparent p-0 border-0 inline-flex items-center justify-center
    ml-4 pb-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={bookmarked === true ? 'bookmark-active w-5 h-5' : 'bookmark w-5 h-5'}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  </div>
</div>
