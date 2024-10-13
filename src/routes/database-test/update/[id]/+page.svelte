<script lang="ts">
    //@ts-nocheck
    import SuperForm from '$lib/components/superforms/Form.svelte';
    import TextField from '$lib/components/superforms/TextField.svelte';
    import HiddenInputField from '$lib/components/superforms/HiddenInputField.svelte';
    import TextAreaField from '$lib/components/superforms/TextAreaField.svelte';
    import { goto } from '$app/navigation';
  
    export let data

    let { Store_Form } = data;
    $: ({ Store_Form } = data);


</script>

<main class="container px-5 py-2 mx-auto">
    <!-- update specific record in stores -->
    <div class="side-line p-4">
        <div class=" card p-2">
            <SuperForm
            action = "?/StoreUpdate"
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
            <HiddenInputField {form} field="id"></HiddenInputField>
            <!-- for Store Name -->
            <TextField type="text" {form} field="name" label="Store Name" ></TextField>
            <!-- for location -->
            <TextField type="text" {form} field="location" label="Location"></TextField>
            <!-- for description -->
            <TextAreaField type="text" {form} field="description" label="description" rows="4"></TextAreaField>
            <div class= "flex items-center justify-center py-4">
                <button type="submit" class="btn variant-filled-primary px-8">Update</button>
            </div>
        </SuperForm>
        </div>
    </div>
</main>