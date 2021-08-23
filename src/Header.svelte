<script>
  import { gun, currentUser, user } from './user';

  function signout() {
    user.leave();
    currentUser.set('');
  }
</script>

<header>
<h1>🔫💬</h1>
  {#if $currentUser}
    <div class="user-bio">
      
      <span>My name is <strong>{$currentUser}</strong></span>
      <img src={`https://avatars.dicebear.com/api/initials/${$currentUser}.svg`} alt="avatar" /> 
    </div>

    <button on:click={signout}>Sign Out</button>

    {:else}

      <h3>Decentrailized Chat with Gun.js</h3>
  {/if}
</header>