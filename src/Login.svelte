<script>
  import { user } from "./user";

  let username;
  let password;

  function login() {
    user.auth(username, password, ({ err }) => err && alert(err));
  }

  function signup() {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
</script>

<label for="username">الاسم</label>
<input name="username" bind:value={username} minlength="3" maxlength="16" />

<label for="password">الباسوورد</label>
<input name="password" bind:value={password} type="password" />

<button class="login" on:click={login}>تسجيل دخول</button>
<button class="login" on:click={signup}>انشاء حساب</button>
