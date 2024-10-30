import type { RequestEvent } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
  const { params, locals } = event;
  const { token } = params;

  if (!token) {
    throw error(400, 'Missing token');
  }

  try {
    // Attempt to verify the user with the token
    await locals.pb.collection('users').confirmVerification(token);
    console.log('User successfully verified');

  } catch (err) {
    console.error('Verification failed', err);
    // Handle the error appropriately

    if (err instanceof Error) {
      throw error(400, 'Verification failed. The token might be invalid or expired.');
    }

    // Fallback error handling
    throw error(500, ' Server error. Please try again later.');
  }
}
