<script>
    // your script goes here
    import { replace, location } from 'svelte-spa-router';
    var pub = window.sessionStorage.getItem('user')
   let loca =  $location
loca = loca
let words = loca.split('/');
console.log(words);

</script>

<style>
    /* your styles go here */
      .topBar{
         background: #3C424B;
  }
  .post{
      background: #FE657B;
box-shadow: 4px 4px 10px rgba(254, 101, 123, 0.25), -4px -4px 10px rgba(254, 101, 123, 0.25);
border-radius: 100px;
  }

  /* .home{
    fill: #FE657B;
  } */
</style>


<!-- markup (zero or more items) goes here -->
<div class="topBar w-24 h-screen fixed top-0 z-10">
<div class="home ml-6 mt-40" on:click={() => {
         replace('/home')
    }}>
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="{ words[1] === 'home' ? '#FE657B' : 'none'}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"  class="home feather feather-home">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
</svg>
</div>
<div class="notification ml-6 mt-20" on:click={() => {
         replace('/notification')
    }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="{ words[1] === 'notification' ? '#FE657B' : 'none'}"  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
</div>

<div class="bookmark ml-6 mt-20" on:click={() => {
         replace('/bookmarks')
    }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="{ words[1] === 'bookmarks' ? '#FE657B' : 'none'}"  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
</div>

<div class="profile ml-6 mt-20 bg-transparent"  on:click={() => {
         replace('/bio/'+pub)
    }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="{ words[1] === 'bio' ? '#FE657B' : 'none'}"  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
</div>
    <div class="post w-12 h-12 mt-20 mb-12 ml-6" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send mx-2 mt-2 absolute"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></div>
</div>
