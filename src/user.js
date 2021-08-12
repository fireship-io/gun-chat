import { writable } from 'svelte/store';
// import GUN from 'gun';
// import 'gun/sea';
// import 'gun/axe';

export const gun = GUN();

export const currentUser = writable('');
export const avatarColor = writable('');

gun.user().recall({sessionStorage: true}).get('alias').on(v => currentUser.set(v))

gun.on('auth', async(event) => {
    const username = await gun.user().get('alias')//.then()
    console.log(`signed in as ${username}`)
    currentUser.set(username)
});