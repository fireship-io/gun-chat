<script>
  let generatedUrl;

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generate() {
    generatedUrl = `${window.location}?chatParam=${makeid(16)}`;
  }
</script>

<h2>app info</h2>
<ul>
  <li>
    <span>*</span> uses decentralized database so all your data is safe from our
    lizard overloads
  </li>
  <li>
    <span>*</span>
    data is persisted but not stored in any server and cant be accesed by us
  </li>
  <li>
    <span>*</span>
    data depends on users being active so might not be avaiblabne 24/7 or forever
  </li>
</ul>
<input bind:value={generatedUrl} />
<button class="login" on:click={generate}>generate room</button>
{#if generatedUrl}
  <h3 style="color: white;">
    share this link with a friend or more and visit it to start chatting!
  </h3>
{/if}

<style>
  * {
    color: white;
  }
  ul {
    margin-bottom: 40px;
  }
  span {
    color: tomato;
  }
  h2 {
    margin-left: 36px;
    text-align: start;
  }
</style>
