<script>
  // your script goes here
  import { addUserInfo } from '../blue/blue'
  import { getNotificationsContext } from 'svelte-notifications'
  const { addNotification } = getNotificationsContext()
  export let message, pub
  let bio

  function addBio() {
    addUserInfo(bio, pub)
      .then((ack) => {
        addNotification({
          id: 'uniqNotificationId',
          text: 'Bio Updated',
          position: 'top-center',
          type: 'Success',
          removeAfter: 3000,
        })
        console.log(ack)
      })
      .catch((ack) => {
        addNotification({
          id: 'uniqNotificationId',
          text: 'Bio Updated',
          position: 'top-center',
          type: 'Danger',
          removeAfter: 3000,
        })
        console.log(ack)
      })
  }
</script>

<style>
  h2 {
    font-size: 2rem;
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    color: #969696;
    line-height: 25px;
  }

  .con {
    width: 5rem;
    height: 25rem;
  }

  .select-bg {
    border-radius: 5px 5px 0 0;
    z-index: 3;
  }

  .profile-pic {
    z-index: 5;
  }

  .bio {
    width: 40vw;
  }
</style>

<div class="con">
  <div class="profile-pic h-20 w-20 bg-gray-400 ml-4 mt-24 rounded absolute" />
  <div class="select-bg h-40 w-full absolute top-0 left-0 bg-gray-700" />
  <h2 class="ml-4 mt-48 absolute">@{message}</h2>

  <div class=" absolute mt-64">
    <label
      class="block text-gray-500 font-bold md:text-left"
      for="inline-full-name">
      Your Bio
    </label>
    <input
      maxlength="100"
      class="bio bg-gray-200 appearance-none border-2 border-gray-200 rounded
      text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500 "
      id="inline-full-name"
      type="text"
      placeholder="John Wick"
      bind:value={bio} />

    <button class="" on:click={addBio}>Done</button>
  </div>
</div>
