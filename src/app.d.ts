import PocketBase from 'pocketbase';

declare global {
	declare namespace App {
		interface Locals {
			pb: PocketBase;
			user?: UsersRecord;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		interface Error {}
		// interface Platform {}
	}
	
}

export {};