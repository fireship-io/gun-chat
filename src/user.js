import { writable } from 'svelte/store';
import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

export const gun = GUN();
export const user = gun.user().recall({sessionStorage: true});

export const username = writable('');

user.get('alias').on(v => username.set(v))

gun.on('auth', async(event) => {
    const username = await gun.user().get('alias')//.then()
    console.log(`signed in as ${username}`)
    username.set(username)
});