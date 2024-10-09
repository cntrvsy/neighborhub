import { redirect } from '@sveltejs/kit'

//retrieve the data to display in the page
export const load = async ({ locals: { pb } }) => {

    let stores:any = [];

  try {
    // Retrieve the store records
    stores = await pb.collection('store').getFullList(10, {
        expand: 'name,description,location',
    })   

    console.log("store: ", stores);

  } catch (error) {
    console.log("error from insert store data: ", error);
  }


  // Combine data and form into a single object
  const data:any = { stores };

  return data;
};
