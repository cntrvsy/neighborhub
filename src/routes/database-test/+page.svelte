<script lang="ts">
import { goto } from '$app/navigation';
import { Trash2, Pencil } from 'lucide-svelte';

    export let data;
    console.log("data client side",data);
</script>

<section class="mx-auto max-w-screen-2xl">
    <div class="flex item-center justify-center pt-4">
        <button class="btn variant-filled-primary" on:click={() => goto('/database-test/insert')}>Insert a Store</button>
    </div>
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
                        <td><button class="btn variant-filled-secondary"><Pencil size="18"/></button></td>
                        <td><button class="btn variant-filled-secondary"><Trash2 size="18"/></button></td>
                    </tr>
                {/each}
            </tbody>
        </div>
    </div>
</section>