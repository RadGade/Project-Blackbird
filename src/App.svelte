<script>
    import Router, {wrap, push, replace} from 'svelte-spa-router';
    import Notifications from 'svelte-notifications';
    import { get } from 'svelte/store';
    import Land from './components/land.svelte'
    import Home from './screens/home.svelte'
    import Bookmarks from './screens/bookmarks.svelte'
    import Auth from './components/auth.svelte'
    import TopBar from './components/topBar.svelte'
    import Modal from 'svelte-simple-modal';
    import Test from './components/test.svelte'
    import Bio from './screens/bio.svelte'
    import {authStore} from './authStore.js'
    const routes = {
        '/': Land,
        '/auth': wrap(
          Auth,
                  {hello: 'world', myFunc: () => {
            console.log('do something!')
        }},
(detail) => {
                // This pre-condition is executed only if the first one succeeded
                // eslint-disable-next-line no-console
                console.log('Pre-condition 2 executed', detail.location, detail.userData)

                // Always succeed
                return true
            }
        ),

        '/bio/:pub' : wrap(
          Bio,

          (detail) => {
            
            var isAuth = sessionStorage.getItem('isAuth');
            console.log(isAuth)
            if (isAuth !==  'true') {
              console.log("YOU SHALL NOT PASS");
              return false

            } else {
            console.log("Get  in");
              return true
            }
          }
        ),
                '/home' : wrap(
          Home,

          (detail) => {
            
            var isAuth = sessionStorage.getItem('isAuth');
            console.log(isAuth)
            if (isAuth !==  'true') {
              console.log("YOU SHALL NOT PASS");
              return false

            } else {
            console.log("Get  in");
              return true
            }
          }
        ),
                        '/notification' : wrap(
          Home,

          (detail) => {
            
            var isAuth = sessionStorage.getItem('isAuth');
            console.log(isAuth)
            if (isAuth !==  'true') {
              console.log("YOU SHALL NOT PASS");
              return false

            } else {
            console.log("Get  in");
              return true
            }
          }
        ),
                        '/bookmarks' : wrap(
          Bookmarks,

          (detail) => {
            
            var isAuth = sessionStorage.getItem('isAuth');
            console.log(isAuth)
            if (isAuth !==  'true') {
              console.log("YOU SHALL NOT PASS");
              return false

            } else {
            console.log("Get  in");
              return true
            }
          }
        ),
    }

    function conditionsFailed(event) {
    console.error('conditionsFailed event', event.detail)
        replace('/auth')
    }
</script>
<style>
  /* your styles go here */
  :global(body) {
    margin: 0;
    background: #262D37;
    height: 100vh;
    padding: 0;
        overflow:auto;
        max-height:100%;
        overflow-x: hidden;
    width: 100%;

  }

       :global(body)::-webkit-scrollbar {
	 width: 7px;
}
 :global(body)::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track-piece {
	 background-clip: padding-box;
	 border-radius: 2px;
	 background-clip: padding-box;
}
 :global(body)::-webkit-scrollbar-thumb {
	 background-color: #181a1c;
}
 :global(body)::-webkit-scrollbar-track-piece {
	 background-color: rgba(0, 0, 0, 0.25);
}


</style>

<!-- markup (zero or more items) goes here -->
<Notifications>
<Modal>
    <Router {routes} on:conditionsFailed={conditionsFailed}/>

</Modal>

</Notifications>

