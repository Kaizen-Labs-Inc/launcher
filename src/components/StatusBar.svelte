<script lang="ts">
	export let visible: boolean;
</script>

{#if visible}
	<div
		role="status"
		style="left: 50%;
		transform: translateX(-50%);"
		class=" z-40 px-4 mx-4 md:mx-auto text-center items-center justify-center font-mono text-lg bg-black bg-opacity-40  text-white p-2 rounded-2xl fixed bottom-6 flex"
	>
		<slot name="label" />
		<slot name="optionalIcon" />
	</div>
{/if}
