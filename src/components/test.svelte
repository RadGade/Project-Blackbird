<script>
    // your script goes here
import { CodeSnippet } from "carbon-components-svelte";
import TopBar from './topBar.svelte'

    const code = `@mixin grid-container {
  width: 100%;
  padding-right: padding(mobile);
  padding-left: padding(mobile);
  @include breakpoint(bp--xs--major) {
    padding-right: padding(xs);
    padding-left: padding(xs);
  }`

</script>
<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/carbon-components@10.9.0/css/carbon-components.min.css" />
</svelte:head>
<style>
    /* your styles go here */
    h1{
        left: 84px;
        top: 131px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 900;
        font-size: calc(50px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        line-height: 84px;

        color: #FFFFFF;
    }

.con{
    margin-top: 5%;
    margin-left: 5%;
    overflow: hidden;
}

</style>

<TopBar />