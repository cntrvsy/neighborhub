<script lang="ts">
import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
import { getFlash } from 'sveltekit-flash-message';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { Trash2, Pencil } from 'lucide-svelte';

    const toastStore = getToastStore();
    
    const flash = getFlash(page);

    function success_toast(message: string) {
        const t: ToastSettings = {
            //@ts-ignore
            message: $flash?.message,
            background: 'variant-filled-success',
        };
        toastStore.trigger(t);
    }

    function error_toast(message: string) {
        const t: ToastSettings = {
            //@ts-ignore
            message: $flash?.message,
            background: 'variant-filled-error',
        };
        toastStore.trigger(t);
    }

    export let data;

    let { Store_Form } = data;
    $: ({ Store_Form } = data);

    //reactive statement to check if flash exists then trigger the appropriate toast
    
    $: if ($flash) {
        if ($flash?.type === 'success') {
            success_toast($flash.message);
        } else if ($flash.type === 'error') {
            error_toast($flash.message);
        }
    }


    //console.log("data.stores", data.stores);
</script>

<section class="mx-auto max-w-screen-2xl">
    <div class="flex item-center justify-center pt-4">
        <button class="btn variant-filled-primary" on:click={() => goto('/database-test/insert')}>Insert a Store</button>
    </div>
<!-- Ideally i would like to move to using tzezars-datagrid in the future -->
    <div class="flex item-center justify-center h-screen p-10">
       <!-- table -->
        <div class="table table-hover table-cell-compact">
            <!-- table head -->
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                <!-- table body -->
            </thead>
            <tbody>
                {#each data.stores as store}
                    <tr>
                        <td>{store.name}</td>
                        <td>{store.description}</td>
                        <td>{store.location}</td>
                        <td>
                            <button class="btn variant-filled-secondary" on:click={() => goto(`/database-test/update/${store.id}`)}>
                                <Pencil size="18"/>
                            </button>
                        </td>
                        <td> 
                            <form method="POST" action="?/StoreDelete">
                                <input name="id" type="hidden" bind:value={store.id}>
                            <button type="submit" class="btn variant-filled-primary"><Trash2 size="18"/></button>
                            </form>
                            
                        </td>
                    </tr>
                {/each}
            </tbody>
        </div>
    </div>
</section>