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

<input bind:value={generatedUrl} />
<button class="login" on:click={generate}>generate room</button>
{#if generatedUrl}
  <h3 style="color: white;">
    share this link with a friend or more and visit it to start chatting!
  </h3>
{/if}
