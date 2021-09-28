<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { Picker } from 'emoji-picker-element';
	import Popover from 'svelte-popover';
	import Tags from 'svelte-tags-input';
	let popOverIsFocused: boolean = false;
	let query = '';
	let selectedApp;
	let stepOneComplete: boolean = false;
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
		stepOneComplete = false;
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
		style="width: 340px;"
		class="bg-white p-6 shadow-xl text-black rounded-xl mr-2"
	>
		<form>
			{#if !stepOneComplete}
				<div class="mb-4 flex flex-col">
					<input
						bind:value={query}
						name="url"
						autofocus
						type="url"
						id="url"
						placeholder="Search for an app or paste a URL"
						class="bg-gray-200 rounded p-2"
					/>
				</div>
				<div
					on:click={() => {
						stepOneComplete = true;
					}}
					class="flex cursor-pointer justify-center items-center rounded bg-black text-white font-medium py-2 text-lg"
				>
					Continue
				</div>
			{:else}
				<div class="flex flex-row items-end justify-between mb-4 ">
					<div class=" flex flex-col">
						<label for="title" class="font-medium text-gray-500">Name it</label>
						<input
							autofocus
							name="title"
							type="text"
							placeholder="Type a name"
							class="bg-gray-200 rounded p-2"
						/>
					</div>
					<div
						class="cursor-pointer rounded-lg w-12 h-12 bg-gray-300 ml-4 transition duration-200 ease-in-out hover:scale-105"
					>
						<!-- Add icon or emoji here -->
					</div>
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
					<div class="tagsContainer">
						<Tags onlyUnique placeholder="Add tags" />
					</div>
				</div>
				<div
					on:click={() => {
						stepOneComplete = true;
					}}
					class="flex cursor-pointer justify-center items-center rounded bg-black text-white font-medium py-2 text-lg"
				>
					Add it
				</div>
			{/if}
		</form>
	</div>
</Popover>

<style>
	.tagsContainer :global(.svelte-tags-input) {
		background: transparent;
		padding-top: 4px;
		padding-bottom: 4px;
		font-size: 16px;
	}
	.tagsContainer :global(.svelte-tags-input-tag) {
		border-radius: 3px;
		background: rgba(0, 0, 0, 0.8);
		font-size: 16px;
		padding: 4px;
	}

	.tagsContainer :global(.svelte-tags-input-tag-remove) {
		margin-left: 5px;
	}
	.tagsContainer :global(.svelte-tags-input-layout) {
		background-color: #e5e7eb;
		border: none;
		outline: none;
	}

	.tagsContainer :global(.svelte-tags-input-layout:focus) {
		border: none;
	}
	.tagsContainer :global(.svelte-tags-input-layout:hover) {
		border: none;
	}
</style>
