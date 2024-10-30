<script lang="ts">
	import { goto } from "$app/navigation";
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
			<li><code class="code">/src/app.postcss</code> - app wide css</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul>
		<div>
			<button class="btn variant-filled-primary px-2" on:click={() => goto('/database-test')}>Database Example</button>
			<button class="btn variant-filled-primary px-2" on:click={() => goto('/protected')}>protected route</button>
		</div>
	</div>
</div>
