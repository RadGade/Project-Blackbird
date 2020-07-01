<script>
  // your script goes here
  import { addUserInfo, uploadProfilePic, db, uploadBackgroundPic } from '../blue/blue'
  import { getNotificationsContext } from 'svelte-notifications'
  const { addNotification } = getNotificationsContext()
  export let message, pub
  let bio, PP

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
          text: 'oops something went wrong',
          position: 'top-center',
          type: 'Danger',
          removeAfter: 3000,
        })
        console.log(ack)
      })
  }



function readURL(){
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      uploadProfilePic(reader.result).then((ack) => {
        addNotification({
          id: 'uniqNotificationId',
          text: 'Avatar Updated',
          position: 'top-center',
          type: 'Success',
          removeAfter: 3000,
        })
        console.log(ack)
      })
      .catch((ack) => {
        addNotification({
          id: 'uniqNotificationId',
          text: 'oops something went wrong',
          position: 'top-center',
          type: 'Danger',
          removeAfter: 3000,
        })
        console.log(ack)
      })
        document.getElementById('profile-upload').style.backgroundImage = "url(" + reader.result + ")";        
    }
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}

  db.user(pub)
    .get('Bio')
    .on( (ack) => {
      console.log(ack)
      PP = ack.ProfilePic
      PP = PP
      setTimeout(() => { document.getElementById('profile-upload').style.backgroundImage = "url(" + PP + ")";} , 100)
     
    })
  
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



  .bio {
    width: 40vw;
  }

  #profile-upload{
    background-image:url('');
    background-size:cover;
        z-index: 5;
    background-position: center;
  overflow:hidden;
}
#profile-upload:hover input.upload{
  display:block;
}
#profile-upload:hover .hvr-profile-img{
  display:inline-block;
 }
#profile-upload .fa{   margin: auto;
    position: absolute;
    bottom: -4px;
    left: 0;
    text-align: center;
    right: 0;
    padding: 6px;
   opacity:1;
   -webkit-transform: scale(1); 
}
#profile-upload input.upload {
    z-index:1;
    left: 0;
    margin: 0;
    bottom: 0;
    top: 0;
    padding: 0;
    opacity: 0;
    outline: none;
    cursor: pointer;
    position: absolute;
    background:#ccc;
    width:100%;
    display:none;
}

#profile-upload .hvr-profile-img {
  width:100%;
  height:100%;
  display: none;
  position:absolute;
  vertical-align: middle;
  position: relative;
  background: grey;
  opacity: 50%;
 }



</style>

<div class="con">
<div>
<div id='profile-upload' class="h-20 w-20 bg-gray-400 ml-4 mt-24 rounded absolute">
<div class="hvr-profile-img"><input on:change={() => readURL()} type="file" name="logo" id='getval'  class="upload w180" title="Dimensions 180 X 180" ></div>
  <div class="fa fa-camera"><svg class="add" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div>
  </div>

<!-- <img src="https://upload.wikimedia.org/wikipedia/commons/7/71/2010-kodiak-bear-1.jpg" class="profile-pic h-20 w-20 bg-gray-400 ml-4 mt-24 rounded absolute" alt="profilePic" /> -->
</div>
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
