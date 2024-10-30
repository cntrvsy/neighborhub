import { ResetPasswordSchema } from '$lib/types/schema';
import { redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase';
import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async ({ locals: { user } }) => {  
    
    // Create and validate  reset Password form
    const resetPassword_Form = await superValidate(zod( ResetPasswordSchema));
  
    // Combine data and form into a single object
    const data:any = { user, resetPassword_Form};
  
    return data;
  }

export const actions = {
    resetPassword: async ({ request, locals: { pb } }) => {
      const resetPassword_Form = await superValidate(request, zod(ResetPasswordSchema));
  
      console.log('reset Password', resetPassword_Form);
      
      // error checking for the form itself
      if(!resetPassword_Form.valid) {
  
        return fail(400, {message:'Invalid resetPassword Form Form Submission',errors: resetPassword_Form.errors,resetPassword_Form});
  
      } else {
          const { email } = resetPassword_Form.data;
  
          // sending it to PB
          try {
            await pb.collection('users').requestPasswordReset(
              email
            )
            console.log("PB run(resetPassword_Form)")
          } catch (err) {
            console.log("PB run ERROR(resetPassword_Form")
            console.log(error)
            //if PB returns error
            if(err){
              
              if (err instanceof ClientResponseError && err.status === 400) {
                console.log(error)
                return message(resetPassword_Form,{text: 'Invalid Credentials, Try again.', status: 401});
              }
              return fail(500, { message: 'Server error. Try again later.'})
            }
          }
  
          // Successful sign-Up, update the store and dispatch custom event.
          return message(resetPassword_Form,{text: 'Check your email for a link to reset your password.'});
      }
    },

  } satisfies Actions