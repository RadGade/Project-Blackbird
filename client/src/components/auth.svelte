<script>
  // your script goes here
  import { push } from 'svelte-spa-router'
  import { get } from 'svelte/store'
  import { authStore } from '../authStore'
  import { create, auth } from '../blue'
  let alias, pwd
  import { getNotificationsContext } from 'svelte-notifications'
  const { addNotification } = getNotificationsContext()
  async function login() {
    console.log(alias, pwd)
    await auth(alias, pwd)
      .then(async (user) => {
        push('/bio/' + user.sea.pub)
        console.log(user)
      })
      .catch((err) => {
        addNotification({
          id: 'uniqNotificationId',
          text: err,
          position: 'top-center',
          type: 'danger',
          removeAfter: 3000,
        })
      })
  }

  async function register() {
    console.log(alias, pwd)
    await create(alias, pwd)
      .then(async (user) => {
        await auth(alias, pwd).then(async (user) => {
          push('/bio/' + user.sea.pub)
          console.log(user)
        })
      })
      .catch((err) => console.log(err))
  }
</script>

<style>
  /* your styles go here */
  h1 {
    left: 84px;
    top: 131px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: calc(50px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    line-height: 84px;

    color: #ffffff;
  }

  .auth-input {
    width: 40vw;
  }

  .con {
    margin-top: 5%;
    margin-left: 5%;
    overflow: hidden;
  }

  .log {
    outline: none;
    border: none;
  }

  .up {
    outline: none;
    border: none;
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="con">
  <h1>Who are you?</h1>

  <br />

  <form class="w-full max-w-sm mt-8">
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 "
          for="inline-full-name">
          Username
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="auth-input bg-gray-200 appearance-none border-2 border-gray-200
          rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none
          focus:bg-white focus:border-purple-500 sm:w-auto md:w-full "
          id="inline-full-name"
          type="text"
          placeholder="John Wick"
          bind:value={alias} />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label
          class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          for="inline-username">
          Password
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          class="auth-input bg-gray-200 appearance-none border-2 border-gray-200
          rounded w-full py-2 px-4 text-gray-700 leading-tight
          focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-username"
          type="password"
          placeholder="******************"
          bind:value={pwd}
          autocomplete="current-password" />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3" />

    </div>
    <div class="md:flex ml-16 md:items-center">
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <button
          class="up shadow bg-purple-500 hover:bg-purple-400 focus:outline-none
          text-white font-bold py-2 px-4 rounded"
          type="button"
          on:click={register}>
          Sign Up
        </button>
      </div>
      <div class="md:w-2/3">
        <button
          class="log shadow bg-purple-500 hover:bg-purple-400 focus:outline-none
          text-white font-bold py-2 px-4 rounded"
          type="button"
          on:click={login}>
          Log In
        </button>
      </div>
    </div>
  </form>

</div>
