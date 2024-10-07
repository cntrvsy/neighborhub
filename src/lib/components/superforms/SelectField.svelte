<script lang="ts" context="module">
    type T = Record<string, unknown>;
  </script>
  
  <script lang="ts" generics="T extends Record<string, unknown>">
    import { formFieldProxy } from 'sveltekit-superforms';
    import type { SuperForm, FormPathLeaves } from 'sveltekit-superforms';
  
    export let label = '';
    export let field: FormPathLeaves<T>;
    export let form: SuperForm<T>;
  
    const { value, errors, constraints } = formFieldProxy(form, field);
  </script>
  
  {#if label !== undefined}
    <label class="label text-lg" for={field}>{label}</label>
  {/if}
  <div class="control space-y-4">
    <select
      class="select pl-4"
      name={field}
      aria-invalid={$errors ? 'true' : undefined}
      bind:value={$value}
      {...$constraints}
      {...$$restProps}
    >
     <slot></slot>
    </select>
  </div>
  {#if $errors}
    <p class="text-sm text-error-500">{$errors}</p>
  {/if}
  <br>