import { SignInSchema, SignUpSchema } from '$lib/types/schema';
import { redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase';
import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async ({ locals: { user } }) => {

  // if the user is already logged take them straight to the users page
  if (user !== undefined) {
    console.log("hey you, lets get inside")
    throw redirect(303, '/Portal')
  }

  
  // Create and validate sign up and sign in form
  const SignIn_Form = await superValidate(zod(SignInSchema));
  const SignUp_Form = await superValidate(zod(SignUpSchema));

  // Combine data and form into a single object
  const data:any = { user, SignUp_Form, SignIn_Form };

  return data;
}

export const actions = {
  signIn: async ({ request, locals: { pb } }) => {
    const signIn_Form = await superValidate(request, zod(SignInSchema));

    console.log('Sign In', signIn_Form);
    
    // error checking for the form itself
    if(!signIn_Form.valid) {

      return fail(400, {message:'Invalid signIn Form Submission',errors: signIn_Form.errors,signIn_Form});

    } else {
        const { email, password } = signIn_Form.data;

        // sending it to PB
        try {
          await pb.collection('users').authWithPassword(
            email,
            password,
          )
          console.log("PB run(signIn)")
        } catch (err) {
          console.log("PB run ERROR(signIn)")
          console.log(error)
          //if PB returns error
          if(err){
            
            if (err instanceof ClientResponseError && err.status === 400) {
              console.log(error)
              return message(signIn_Form,{text: 'Invalid Credentials, Try again.', status: 401});
            }
            return fail(500, { message: 'Server error. Try again later.'})
          }
        }

        // Successful sign-In, update the store and dispatch custom event.
        redirect(303, '/Portal')
      //return message(signIn_Form, {text: 'benin posted, refresh the page'});
    }
  },
  signUp: async ({ request, locals: { pb } }) => {
    console.log("PocketBase instance (pb):", pb);
    const signUp_Form = await superValidate(request, zod(SignUpSchema));

    console.log('Sign Up', signUp_Form);
    // error checking for the form itself
    if(!signUp_Form.valid) {

      return fail(400, {message:'Invalid Form Submission',errors: signUp_Form.errors,signUp_Form});

    } else {
        const { email, password, confirm } = signUp_Form.data;

        let passwordConfirm = confirm;
        // sending it to PB
        try {
          await pb.collection('users').create({
            email,
            password,
            passwordConfirm,
          })
          console.log("PB run(signUp)")
          await pb.collection('users').requestVerification(email);

        } catch (err) {
           //if PB returns error
           console.log("PB run ERROR(signUp)", err);

           if(err){
            if (err instanceof ClientResponseError && err.status === 400) {
              return message(signUp_Form,{text: 'Something went wrong, try again', status: 401});
  
            }
            return fail(500, { message: 'Server error. Try again later.'})
          }
        }
        // Successful sign-Up, update the store and dispatch custom event.
      return message(signUp_Form,{text: 'Check your Email for Confirmation.'});
    }
  }
} satisfies Actions
