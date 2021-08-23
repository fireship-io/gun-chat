<script>
  import { username, user } from './user';

  function signout() {
    user.leave();
    username.set('');
  }
</script>

<header>
<h1>🔫💬</h1>
  {#if $username}
    <div class="user-bio">
      
      <span>My name is <strong>{$username}</strong></span>
      <img src={`https://avatars.dicebear.com/api/initials/${$username}.svg`} alt="avatar" /> 
    </div>

    <button on:click={signout}>Sign Out</button>

    {:else}

      <h3>Decentrailized Chat with Gun.js</h3>
  {/if}
</header>