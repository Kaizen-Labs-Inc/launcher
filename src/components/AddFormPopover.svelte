<script lang="ts">
	import { onMount } from 'svelte';

	import { scale } from 'svelte/transition';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import Popover from 'svelte-popover';
	let popOverIsFocused: boolean = false;

	onMount(() => {
		document.addEventListener(
			'keydown',
			(event) => {
				if (popOverIsFocused && event.key === 'Escape') {
					popOverIsFocused = false;
				}
			},
			false
		);
	});
</script>

<Popover
	arrow={false}
	placement="left-start"
	open={popOverIsFocused}
	on:open={() => {
		popOverIsFocused = true;
	}}
	on:close={() => {
		popOverIsFocused = false;
	}}
>
	<button
		slot="target"
		class="cursor-pointer transition duration-200 ease-in-out {popOverIsFocused
			? 'rotate-45'
			: 'hover:scale-110 hover:opacity-100 opacity-75'}"
		><PlusCircleIcon size="48" strokeWidth="1" /></button
	>
	<!-- TODO add icon/image upload -->

	<div
		transition:scale={{ duration: 200, opacity: 0, start: 0.9 }}
		slot="content"
		style="width: 400px;"
		class="bg-white p-6 shadow-lg text-black rounded-lg mr-2"
	>
		<h2 class="text-xl font-medium ">Add something</h2>
		<form>
			<div class="my-4 flex flex-col">
				<label for="url" class="font-medium text-gray-500">URL of the app or site</label>
				<input
					name="url"
					autofocus
					type="text"
					id="url"
					placeholder="Paste or type a URL"
					class="bg-gray-200 rounded p-2"
				/>
			</div>
			<div class="my-4 flex flex-col">
				<label for="title" class="font-medium text-gray-500">Name it</label>
				<input name="title" type="text" placeholder="Type a name" class="bg-gray-200 rounded p-2" />
			</div>
			<div class="my-4 flex flex-col">
				<label for="description" class="font-medium text-gray-500">Describe it</label>
				<textarea
					name="description"
					type="text"
					placeholder="Add an optional description"
					class="bg-gray-200 rounded p-2"
				/>
			</div>
			<div class="my-4 flex flex-col">
				<label for="tags" class="font-medium text-gray-500">Tag it</label>
				<input
					name="tags"
					type="text"
					placeholder="Add tags to help you and others find it"
					class="bg-gray-200 rounded p-2"
				/>
			</div>
			<div
				class="flex cursor-pointer justify-center items-center rounded bg-black text-white font-medium py-2 text-lg"
			>
				Add
			</div>
		</form>
	</div>
</Popover>
