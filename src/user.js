import { writable } from 'svelte/store';
// import GUN from 'gun';
// import 'gun/sea';
// import 'gun/axe';

export const gun = GUN();

export const currentUser = writable('');

gun.user().recall({sessionStorage: true}).get('alias').then(v => currentUser.set(v))

gun.on('auth', async(event) => {
    const username = await gun.user().get('alias')//.then()
    console.log(`signed in as ${username}`)
    currentUser.set(username)
});

gun.user().get('alias').on((data, key) => {
    currentUser.set(data)
})