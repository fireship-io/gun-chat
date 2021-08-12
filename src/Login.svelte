<script>
  import { gun, currentUser } from './user';

  let username;
  let password;

  function login() {
    gun.user().auth(username, password, ({ err }) => err && alert(err));
  }

  function signup() {
    gun.user().create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
</script>

<label for="username">Username</label>
<input name="username" bind:value={username} />

<label for="password">Password</label>
<input name="password" bind:value={password} type="password" />

<button class="login" on:click={login}>Login</button>
<button class="login"  on:click={signup}>Sign Up</button>
  
