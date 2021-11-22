<script lang="ts">
	import { ArrowUpRightIcon } from 'svelte-feather-icons';
</script>

<nav class="mt-4">
	<ul class="flex flex-row justify-center items-center text-gray-400">
		<li class="cursor-pointer mr-6 hover:text-white"><a href="/">Home</a></li>
		<li class="cursor-pointer mr-6 hover:text-white"><a href="#">Pricing</a></li>
		<li class="cursor-pointer mr-6 hover:text-white flex items-center">
			<a href="#" target="_blank" rel="external">Github</a>
			<ArrowUpRightIcon strokeWidth={1} size="18" />
		</li>
		<li class="cursor-pointer mr-6 hover:text-white text-yellow-200">
			<a href="/sign-in">Sign in</a>
		</li>
	</ul>
</nav>

<style>
	nav a {
		text-decoration: none;
	}
</style>
