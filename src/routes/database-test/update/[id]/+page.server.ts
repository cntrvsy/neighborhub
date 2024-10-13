import { StoreUpdateSchema } from "$lib/types/schema";
import { ClientResponseError } from 'pocketbase';
import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

let id_store: { id: string };

export const load = async ({ params,locals: { pb } }) => {
    //we do not require anything from locals yet such as a session token right no so...

    // Access parameter from the route
    id_store = params;

    // Retrieve specific store
    let record = await pb.collection('store').getOne(id_store.id, {
        expand: 'id,name,description,location',
    })

    console.log("specific store: ", record)

    if (error) {
    console.error(error);
    }

    //create and validate store form
    //@ts-ignore
    const Store_Form = await superValidate(record, zod(StoreUpdateSchema));

    //Combine data from locals and form into a single object
    const data:any = {Store_Form};

    return data;
}


export const actions = {
    //"StoreInsert" action here refers to the name of the form action, so what should happen when the form
    //is submitted.
    StoreUpdate: async ({ request, locals: { pb } }) => {
        const Store_Form = await superValidate(request, zod(StoreUpdateSchema));
        
        console.log('Store Form', Store_Form);

        // error checking for the form itself, here we will tell superforms if there is an error in the form
        if (!Store_Form.valid) {
            
            return fail(400, {message:'Invalid signIn Form Submission',errors: Store_Form.errors,Store_Form});
        
        } else {
            const { id, name, description, location } = Store_Form.data;

            // sending it to PB (pocketbase)
            try {
                await pb.collection('store').update(id, { name, description, location });
                console.log("PB run (Store data updated)");
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
            // this sends a message to the client informing the user that the form has been submitted.
            return message(Store_Form,{text: 'Store Updated.', status: 200});
        }
    }
} satisfies Actions