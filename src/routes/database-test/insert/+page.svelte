<script lang="ts">
    // @ts-nocheck
    import SuperForm from '$lib/components/superforms/Form.svelte';
    import TextField from '$lib/components/superforms/TextField.svelte';
    import TextAreaField from '$lib/components/superforms/TextAreaField.svelte';

    import items from '$lib/assets/items.svg';

    export let data;

    let { Store_Form } = data;
    $: ({ Store_Form } = data);
</script>

<main>
    <section class="container px-5 py-2 mx-auto">
        <div class="container mx-auto flex items-center justify-center flex-col">
            <div class="container mx-auto flex py-2 items-center justify-center flex-col">
                <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={items}>
                    <div class="text-center lg:w-2/3 w-full">
                        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium">Add a Store</h1>
                        <p class="leading-relaxed mb-8">
                            Here you can add your own personal Stores. This includes store name,
                             location, website and more in relation to your account. Stores here relate
                             to shops that you want to keep track of and wnt to reference to.
                        </p>
                        <div class="side-line">
                            <div class="card p-2">
                                <SuperForm
                                    action = "?/StoreInsert"
                                    data= {data?.Store_Form}
                                    invalidateAll={false}
                                    let:form let:message
                                >
                                    <div class="py-4 px-2 alert-message">
                                        {#if message}
                                        <div class= "alert
                                            {message.status >= 400 ? 'variant-filled-error': 'variant-filled-success'}
                                            text-white p-4 rounded-md"
                                        > 
                                            {message.text}
                                        </div>
                                        {/if}
                                    
                                    </div>
                                    
                                    <!-- for Store Name -->
                                    <TextField type="text" {form} field="name" label="Store Name" ></TextField>
                                    <!-- for location -->
                                    <TextField type="text" {form} field="location" label="Location"></TextField>
                                    <!-- for description -->
                                    <TextAreaField type="text" {form} field="description" label="description" rows="4"></TextAreaField>
                                    <div class= "flex items-center justify-center py-4">
                                        <button type="submit" class="btn variant-filled-primary px-8">Insert</button>
                                    </div>
                                </SuperForm>
                            </div>
                        </div>
                        
                    </div>
                </div>
        </div>
    </section>
</main>