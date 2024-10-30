<script lang="ts">
    // @ts-nocheck
    import SuperForm from '$lib/components/superforms/Form.svelte';
    import TextField from '$lib/components/superforms/TextField.svelte';
    import reset from '$lib/assets/ui/reset.svg';   
    
    export let data

    let { user, resetPassword_Form } = data;
    $: ({ user, resetPassword_Form } = data);

</script>
    
<section>
    <div class="container mx-auto flex px-5 py-8 items-center justify-center flex-col">
        <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="{reset}">
        <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium">Enter Your email below:</h1>
            <p class="leading-relaxed mb-8">
                We will send you the link to where you will be allowed to reset your password.
            </p>
            <div class="flex justify-center">
                <div class="card p-4 w-full text-token space-y-4">
                    <SuperForm
                    action = "?/resetPassword"
                    data = {data?.resetPassword_Form}
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
                    <!-- for email -->
                    <TextField type="text" {form} field="email" label="E-Mail" custom_placeholder="name@text.com"></TextField>
                    <div class= "flex items-center justify-center py-4">
                        <button type="submit" class="btn variant-filled-primary px-8">RESET PASSWORD</button>
                    </div>
                    </SuperForm>
                </div>
            </div>
        </div>
    </div>
 </section>