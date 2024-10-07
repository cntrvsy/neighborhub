<script lang="ts">
	import { formFieldProxy } from 'sveltekit-superforms';
	import type { SuperForm, FormPathLeaves } from 'sveltekit-superforms';
  
	type T = $$Generic<Record<PropertyKey, unknown>>;
  
	export let field: FormPathLeaves<T>;
	export let form: SuperForm<T>;
  
	const { value, errors, constraints } = formFieldProxy(form, field);
  </script>
  
  <input
	type="hidden"
	name={field}
	value={$value}
	aria-invalid={$errors ? 'true' : undefined}
	{...constraints}
  />
  
  {#if $errors}
	<p class="text-sm text-error-500">{$errors}</p>
  {/if}