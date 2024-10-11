import { setFlash } from 'sveltekit-flash-message/server';
import { fail, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

//retrieve the data to display in the page
export const load = async ({ locals: { pb } }) => {
  
  //lets store the records in an array
  let stores:any = [];

  try {
    // Retrieve the store records
    stores = await pb.collection('store').getFullList(10, {
        expand: 'id,name,description,location',
    })   

    // console.log("store: ", stores);

  } catch (error) {
    console.log("error from insert store data: ", error);
  }

  // Combine data and form into a single object
  const data:any = { stores };

  return data;
};


// lets have the delete logic here,
export const actions = {
  //"StoreInsert" action here refers to the name of the form action, so what should happen when the form
  //is submitted.
  StoreDelete: async ({ request, cookies, locals: { pb } }) => {
    
    const storeForm = await request.formData();
    const id  = storeForm.get('id');

    // sending it to PB (pocketbase)
    try {
      //typescript bothering me here to deal with a null case i cant be bothered.
      console.log("id server side",id);
      //@ts-ignore
        await pb.collection('store').delete(id);

        console.log("PB run (Store data deleted)");
    } catch (err) {
        //if PB returns error
      if(err){
          //using instead sveltekit flash message instead of the forms.svelte to deliver message client side
          setFlash(
            { type: 'error', message: 'failed to delete store record' }, 
            cookies
          );
      }
    }
    // this sends a message to the client informing the user that the form has been submitted.
    setFlash(
      { type: 'success', message: 'store record deleted successfully' }, 
      cookies
    );
  }
} satisfies Actions