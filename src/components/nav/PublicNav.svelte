<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowUpRightIcon } from 'svelte-feather-icons';
</script>

<nav class="mt-4">
	<ul class="flex flex-row justify-center items-center flex-wrap">
		<li class="mr-6">
			<!-- TODO figure out why page path styles aren't applying -->
			<a
				href="/"
				class="{$page.path === '/'
					? 'text-opacity-10'
					: 'text-opacity-50'} hover:text-opacity-100 flex items-center"
				><img src="favicon-32x32.png" class="w-4 h-4 mr-1" alt="Logo" />Home</a
			>
		</li>
		<li class="mr-6">
			<a
				href="/demo"
				class="{$page.path === '/demo'
					? 'text-opacity-10'
					: 'text-opacity-50'} hover:text-opacity-100">Demo</a
			>
		</li>
		<li class="mr-6">
			<a
				href="/pricing"
				class="{$page.path === '/pricing'
					? 'text-opacity-10'
					: 'text-opacity-50'} hover:text-opacity-100">Pricing</a
			>
		</li>
		<li class="mr-6 hover:text-opacity-100 text-opacity-50 flex items-center">
			<a href="https://github.com/natevaughan/springboard" target="_blank" rel="external">Github</a>
			<ArrowUpRightIcon strokeWidth={1} size="18" />
		</li>
		<li class="text-yellow-200">
			<a href="/hi">Sign in</a>
		</li>
	</ul>
</nav>

<style>
	nav a {
		text-decoration: none;
	}
</style>
