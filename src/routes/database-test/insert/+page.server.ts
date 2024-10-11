import { StoreSchema } from "$lib/types/schema";
import { redirect } from '@sveltejs/kit'
import { ClientResponseError } from 'pocketbase';
import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
    //we do not require anything from locals yet such as a session token right no so...

    //create and validate store form
    const Store_Form = await superValidate(zod(StoreSchema));

    //Combine data from locals and form into a single object
    const data:any = {Store_Form};

    return data;
}


export const actions = {
    //"StoreInsert" action here refers to the name of the form action, so what should happen when the form
    //is submitted.
    StoreInsert: async ({ request, locals: { pb } }) => {
        const Store_Form = await superValidate(request, zod(StoreSchema));
        
        console.log('Store Form', Store_Form);

        // error checking for the form itself, here we will tell superforms if there is an error in the form
        if (!Store_Form.valid) {
            
            return fail(400, {message:'Invalid signIn Form Submission',errors: Store_Form.errors,Store_Form});
        
        } else {
            const { name, description, location } = Store_Form.data;

            // sending it to PB (pocketbase)
            try {
                await pb.collection('store').create({ name, description, location });
                console.log("PB run (Store data inserted)");
            } catch (err) {
                //if PB returns error
                if(err){
                    if (err instanceof ClientResponseError && err.status === 400) {
                        console.log(error)
                        return message(Store_Form,{text: 'Something went wrong, Try again.', status: 401});
                    }
                    return fail(500, { message: 'Server error. Try again later.'})
                }
            }
            return message(Store_Form,{text: 'Store inserted.', status: 200});
        }
    }
} satisfies Actions