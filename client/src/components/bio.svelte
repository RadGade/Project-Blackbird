<script>
  // your script goes here
  import TopBar from './topBar.svelte'
  import EditBio from './edit-bio.svelte'
  export let pub
  import { db } from '../blue/blue'
  import { push } from 'svelte-spa-router'
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'
  const { open } = getContext('simple-modal')
  let Bio, PP
  let is = []
  let opening = false
  let opened = false
  let closing = false
  let epub
  let closed = false
  var Username
  db.user().recall({ sessionStorage: true }, (user) => {
    console.log('recall', user.put.alias)
    window.sessionStorage.setItem('user', user.put.pub)
  })
  db.user(pub)
    .get('Bio')
    .on((ack) => {
      console.log(ack)
      Bio = ack.bio
      PP = ack.ProfilePic
      Bio = Bio
    })

  setTimeout(() => {
    var user = db.user().is
    console.log(user)
  }, 300)

  setTimeout(function () {
    db.user(pub).once((user) => {
      Username = user.alias
      Username = Username
      console.log(Username)
    })
  }, 300)
  var myPub = window.sessionStorage.getItem('user')
  var myEPub = window.sessionStorage.getItem('epub')
  let current = 'Following'

  const showPopupCustom = () => {
    open(
      EditBio,

      {
        message: Username,
        pub: pub,
      },

      {
        styleBg: {
          background: 'rgba(39, 39, 39, 0.9);',
        },
        styleWindow: {
          background: '#3C424B',
          overflow: 'none',
        },
        transitionWindow: fly,
        transitionWindowProps: {
          y: 100,
          duration: 1000,
        },
      },
      {
        onOpen: () => {
          opening = true
        },
        onOpened: () => {
          opening = false
          opened = true
        },
        onClose: () => {
          opened = false
          closing = true
        },
        onClosed: () => {
          closing = false
          closed = true
          setTimeout(() => {
            closed = false
          }, 1000)
        },
      },
    )
  }
</script>

<style>
  /* your styles go here */
  .profile-con {
    background: #3c424b;
    border-radius: 8px;
    padding-top: 0.2%;
    z-index: 5;
  }

  .username {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    line-height: 14px;
    color: #777777;
  }

  .met-con p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    /* identical to box height */
    color: #777777;
  }

  .line {
    width: 49px;
    height: 0px;
    position: absolute;
    border: 0.5px solid #262d37;
    transform: rotate(-90deg);
  }
  .Follow {
    background: #6ce1fb;
    box-shadow: 4px 4px 10px rgba(108, 225, 251, 0.25),
      -4px -4px 10px rgba(108, 225, 251, 0.25);
    border-radius: 8px;
    border: none;
    outline: none;
    font-family: Segoe UI;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    color: #ffffff;
  }
  .Following {
    background: #fe657b;
    box-shadow: 4px 4px 10px rgba(254, 101, 123, 0.25),
      -4px -4px 10px rgba(254, 101, 123, 0.25);
    border-radius: 8px;
    border: none;
    outline: none;
    font-family: Segoe UI;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    color: #ffffff;
  }

  .Following:hover {
    background: #f4203e;
    box-shadow: 4px 4px 10px rgba(244, 32, 62, 0.25),
      -4px -4px 10px rgba(244, 32, 62, 0.25);
    border-radius: 8px;
    border: none;
    outline: none;
    font-family: Segoe UI;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;

    color: #ffffff;
  }

  .post:focus {
    border: none;
    outline: none;
  }
</style>

<div class=" h-64 absolute">
  <!-- markup (zero or more items) goes here -->
  <div class="profile-con h-64 w-64 ml-48 mt-56 absolute">
    <img src={PP} class="profile-pic h-20 w-20 bg-gray-700 rounded ml-20 mt-4" alt = "profilePic" />
    <p class="username ml-20 mt-4">@{Username}</p>

    <p
      class=" absolute bg-transparent text-white ml-5 mt-4 text-sm text-gray-600
      border-none outline-none ">
      {Bio}
    </p>

    <div class="met-con ml-4">
      <div class="snip-count">
        <p class=" ml-5 mt-16 absolute">Snippets</p>
        <div class="line mt-24 ml-12" />
        <div class="followers-count">
          <p class="ml-24 mt-16 absolute">Followers</p>
        </div>
        <div class="line mt-24 ml-32" />
        <div class="following-count">
          <p class="ml-40 mt-16 absolute">Following</p>
        </div>
      </div>
    </div>

    {#if epub != myEPub}
      {#if current === 'Follow'}
        <button
          class="Follow w-full h-8 mr-2 mt-40 "
          on:click={() => (current = 'Follow')}>
          Follow
        </button>
      {:else if current === 'Following'}
        <button
          class="Following w-full h-8 mr-2 mt-40 "
          on:click={() => (current = 'Following')}>
          Following
        </button>
      {:else}
        <!-- else content here -->
      {/if}
    {:else}
      <!-- else content here -->
      <button
        class="Follow w-full h-8 mr-2 mt-40 "
        on:click={() => showPopupCustom()}>
        Edit Bio
      </button>
    {/if}
  </div>

</div>



<!-- <h1>Who are you</h1>

<div class="auth-con">
    <input type="text" placeholder="username">
    <input type="password" placeholder="password">
         <button class="btn-shine">
        <span>Login</span>
      </button><button>Sign Up</button>
</div> -->