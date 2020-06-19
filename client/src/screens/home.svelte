<script>
  import { db } from '../blue/blue'
  import TopBar from '../components/topBar.svelte'
  import SnipInput from '../components/snippetInput.svelte'
  import Snippet from '../components/snippet.svelte'
  let data = []
  let active
  let pub
  var net = db.get('devnet')
  net
    .get('snippets')
    .map()
    .on((u) => {
      data.push(u)

      data = data
      console.log(data)
    })

  db.user().recall({ sessionStorage: true }, (user) => {
    console.log('recall', user.put.alias)
  })

  pub = window.sessionStorage.getItem('user')
  db.user(pub)
    .get('likes')
    .map()
    .on((u) => {
      if (u.postID) {
        active = true
      }
    })
</script>

<style>

</style>

<!-- markup (zero or more items) goes here -->

<TopBar />
<SnipInput />

<div class=" z-0 mt-56 absolute w-full h-auto">
  {#each data as s}
    <Snippet
      message="{s.dis},"
      username="{s.alias},"
      id={s.postID}
      {pub}
      uuid={s.uuid} />
  {/each}
</div>
