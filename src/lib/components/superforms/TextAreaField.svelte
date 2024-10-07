<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { formFieldProxy } from 'sveltekit-superforms';
	import type { SuperForm, FormPathLeaves } from 'sveltekit-superforms';

	let _class = '';
	export { _class as class };

	export let label = '';
	export let field : FormPathLeaves<T>;
	export let form : SuperForm<T>;

	const { value, errors, constraints } = formFieldProxy(form, field);
</script>
    
    {#if label !== undefined}
        <label class="label text-lg" for={field}>{label}</label>
    {/if}
    <div class="control space-y-4">
        <textarea
        rows="3" 
        class={"textarea pl-4"+ _class} 
            name={field} 
            aria-invalid={$errors ? 'true' : undefined}  
            placeholder=""
            bind:value={$value}  
            {...$constraints}  
            {...$$restProps}
        />    
    </div>
    {#if $errors}
        <p class="text-sm text-error-500">{$errors}</p>
    {/if}
    <br>
    