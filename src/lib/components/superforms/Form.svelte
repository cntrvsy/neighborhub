<script lang="ts" context="module">
	type T = Record<string, unknown>;
	type M = unknown;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, M">
    //@ts-nocheck
    import { getToastStore } from '@skeletonlabs/skeleton';
    
    const toastStore = getToastStore();

    import SuperDebug, { superForm } from 'sveltekit-superforms';
    import type { SuperValidated } from 'sveltekit-superforms';


    export let data: SuperValidated<T, M>
    export let dataType = 'form' // : 'form' | 'json' = 'form';
    export let invalidateAll = true // set to false to keep form data using multiple forms on a page

    export const theForm = superForm(data, {
        dataType,
        invalidateAll,
        
        onError({ result }) {
            $message = {
                text: result?.error?.message,
                status: 500
            }
            const t: ToastSettings = {
                    message: 'Something went wrong'
                };
                toastStore.trigger(t)

        },
        onUpdated({ form }) {
            if (form.valid) {
                // Successful post! Do some more client-side stuff.
                const t: ToastSettings = {
                    message: 'Communicating with Server...'
                };
                toastStore.trigger(t)
                
                // redirect to what was given.
                
            }
        }
    })

    const {form, message, tainted, delayed, errors, allErrors, enhance } = theForm
</script>

<form method="POST" use:enhance {...$$restProps}>
	<!-- {#if $delayed}
        <div class="flex flex-col">
            <div class="justify-center">
                <CustomLoadingForm />
            </div>
        </div> 
     {/if} -->
    <slot
		form={theForm}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
	/>
</form>

<!-- uncomment for local development use only. -->
<SuperDebug data={$form}></SuperDebug>