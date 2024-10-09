<script lang="ts">
    // @ts-nocheck
    import SuperForm from '$lib/components/superforms/Form.svelte';
    import TextField from '$lib/components/superforms/TextField.svelte';
    
    export let data;

    let { Store_Form } = data;
    $: ({ Store_Form } = data);

</script>
<section class="mx-auto max-w-screen-2xl">
    <div class="flex item-center justify-center h-screen p-10">
        <h1>HEY THERE</h1>
    </div>
</section>