<script lang="ts">
    // @ts-nocheck
    import SuperForm from '$lib/components/superforms/Form.svelte';
    import TextField from '$lib/components/superforms/TextField.svelte';
    import HiddenInputField from '$lib/components/superforms/HiddenInputField.svelte';
    import reset from '$lib/assets/ui/reset.svg';   
	import { onMount } from 'svelte';
    
    export let data

    let { token, confirmPassword_Form } = data;
    $: ({ token, confirmPassword_Form } = data);

    // Ensure the token is set in the form data reactively
    $: if (confirmPassword_Form) {
        confirmPassword_Form.data.token = token;
    }

    onMount(() => {
        confirmPassword_Form.data.token = token
        console.log("confirmPassword_Form token => ",confirmPassword_Form.data.token)
    })
 

    // console.log("token from +page.svelte",token)
</script>
    
<section>
    <div class="container mx-auto flex px-5 py-8 items-center justify-center flex-col">
        <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="{reset}">
        <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium">Enter Your New Password Below:</h1>
            <div class="flex justify-center">
                <div class="card p-4 w-full text-token space-y-4">
                    <SuperForm
                    action = "?/confirmPassword"
                    data = {data?.confirmPassword_Form}
                    invalidateAll={false}
                    let:form let:message
                    >
                    {#if message}
                        <div class="alert
                        {message.status >= 400 ? 'variant-filled-error' : 'variant-filled-success'}
                        text-white p-4 rounded-md"
                        >
                        {message.text}
                        </div>
                    {/if}
                    <!-- hidden input token -->
                    <HiddenInputField {form} field="token" value={token}></HiddenInputField>
                    <!-- for password -->
                    <TextField type="password" {form} field="password" label="Password"></TextField>
                    <!-- for password  confirm-->
                    <TextField type="password" {form} field="confirm" label="Confirm Password"></TextField>
                    <div class= "flex items-center justify-center py-4">
                        <button type="submit" class="btn variant-filled-primary px-8">SUBMIT</button>
                    </div>
                    </SuperForm>
                </div>
            </div>
        </div>
    </div>
 </section>