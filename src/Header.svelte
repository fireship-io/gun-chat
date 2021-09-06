<script>
  import { username, user } from "./user";

  function signout() {
    user.leave();
    username.set("");
  }
</script>

<header>
  <a href="/"><h3>💬 كلمني</h3></a>
  {#if $username}
    <div class="user-bio">
      <span><strong>{$username}</strong> اهلا</span>
      <img
        src={`https://avatars.dicebear.com/api/gridy/${$username}.svg`}
        alt="avatar"
      />
    </div>

    <button class="signout-button" on:click={signout}>تسجيل خروج</button>
    <!-- {:else} -->
  {/if}
</header>

<style>
  a {
    color: white;
    text-decoration: none;
  }
</style>
