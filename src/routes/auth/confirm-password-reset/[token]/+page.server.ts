import { ConfirmPasswordSchema} from '$lib/types/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect, error, fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export async function load(event: RequestEvent) {
  const { params, locals } = event;
  const { token } = params;

  if (!token) {
    throw error(400, 'Missing token');
  }
    // Create and validate  confirm Password Password form
    const confirmPassword_Form = await superValidate(zod(ConfirmPasswordSchema));

    const data:any = {token, confirmPassword_Form};

    return data;
}

export const actions = {
    confirmPassword: async ({ request, locals: { pb } }) => {
      const ConfirmPassword_Form = await superValidate(request, zod(ConfirmPasswordSchema));
  
      console.log('confirm Password', ConfirmPassword_Form);
      
      // error checking for the form itself
      if(!ConfirmPassword_Form.valid) {
  
        return fail(400, {message:'Invalid resetPassword Form Form Submission',errors: ConfirmPassword_Form.errors,ConfirmPassword_Form});
  
      } else {
          const { token, password, confirm } = ConfirmPassword_Form.data;
        

          // sending it to PB
          try {
            await pb.collection('users').confirmPasswordReset(
              token,
              password,
              confirm
            )
            console.log("PB run(resetPassword_Form)")
          } catch (err) {
            console.log("PB run ERROR(resetPassword_Form")
            console.log(error)
            //if PB returns error
            if(err){
              
              if (err instanceof ClientResponseError && err.status === 400) {
                console.log(error)
                return message(ConfirmPassword_Form,{text: 'Something went wrong or Token must have expired, Try again or request a new one.', status: 401});
              }
              return fail(500, { message: 'Server error. Try again later.'})
            }
          }
  
          // Successful sign-Up, update the store and dispatch custom event.
          return message(ConfirmPassword_Form,{text: 'Password changed successfully. Try sign in into the Portal'});
      }
    },

  } satisfies Actions
