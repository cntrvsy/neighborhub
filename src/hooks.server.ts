//@ts-nocheck
import PocketBase from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	
	//console.log("PB Server hook started")
	event.locals.pb = new PocketBase(import.meta.env.VITE_PB_URL);

	// load the store data from the request cookie string
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	//lets shorten the code for the user
	if(event.locals.pb.authStore.isValid){
		console.log("PB authStore is valid")
		event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model)
		//console.log("event.locals.user",event.locals.user)
	} else {
		event.locals.user  = undefined
	}
	
	try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.pb.authStore.isValid && await event.locals.pb.collection('users').authRefresh();
		//console.log("PB up to date")
    } catch (_) {
        // clear the auth store on failed refresh
        event.locals.pb.authStore.clear();
		console.log("PB cleared")
    }

	const response = await resolve(event);
	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	
	// console.log("PB instance set in hooks:", event.locals.pb);
	//protect the Protected route example route
	if (event.url.pathname === '/protected') {
		//console.log("Protected route, protected")
		const user = await event.locals.user
		if (!user) {
			//User is not signed in
			throw redirect(303, '/auth')
		}
	}

	return response;
}; 