<script>
    // your script goes here
    import {deploy, db} from '../blue';
    let dis;
    let uuid = window.sessionStorage.getItem("user") 
    let alias = window.sessionStorage.getItem("alias")
    function send () {
        deploy(dis, uuid, alias).then(ack => console.log(ack))
        dis = ""
    }

</script>

<style>
    /* your styles go here */
    .pInput{
        background: #2A2E34;
        outline: none;
        color: #777777;
        border: none;
    }
    .Following{
background: #FE657B;
box-shadow: 4px 4px 10px rgba(254, 101, 123, 0.25), -4px -4px 10px rgba(254, 101, 123, 0.25);
border-radius: 8px;
border: none;
outline: none;
font-family: Segoe UI;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 16px;

color: #FFFFFF;
  }
    .pCon{
        background: #3C424B;
        height: 11rem;
    }
</style>

<!-- markup (zero or more items) goes here -->

<div class="pCon w-1/2 rounded-md mt-12 absolute ml-32">
<textarea class="pInput w-10/12 h-20 rounded-md mt-6  ml-20 absolute " bind:value={dis}></textarea>
         <button class="Following w-20 h-8 mt-32 mr-8 float-right mb-4 " on:click={send}> Deploy </button>
</div> 
