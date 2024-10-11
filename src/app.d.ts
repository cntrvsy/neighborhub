import PocketBase from 'pocketbase';

declare global {
	declare namespace App {
		interface Locals {
			pb: PocketBase;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		}
		interface Error {}
		// interface Platform {}
	}
	
}

export {};