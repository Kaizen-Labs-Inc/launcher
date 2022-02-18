<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { userStore } from '../stores/userStore';
	import { goto } from '$app/navigation';

	userStore.subscribe((value) => {
		if (value.user) {
			goto('/home');
		}
	});
	afterNavigate(() => {
		window.analytics.page();
	});
</script>

<svelte:head>
	<title>Launcher - you're up and running.</title>
</svelte:head>
<div class="container mx-auto">
	<div class="mt-24">
		<div class="flex md:flex-row flex-col justify-between items-center">
			<div class="flex flex-col mx-auto items-center">
				<h1 class="font-bold text-4xl md:text-6xl md:text-left" style="line-height: 115%">
					You're up and running.
				</h1>
				<h2 class="text-3xl opacity-80 mt-6">Welcome to Launcher!</h2>
				<p class="mt-8 opacity-60 text-xl">
					Support the team by subscribing to <a href="https://launcher.team">our hosted version</a>,
					or <a href="https://github.com/natevaughan/launcher">visit us on Github</a> to contribute.
				</p>
				<div class="flex flex-col items-center  mt-8">
					<div class="flex flex-col my-4 items-start">
						<div
							on:click={() => {
								goto('/sign-in');
							}}
							class="cta mx-auto rounded-md cursor-pointer text-2xl font-medium py-3 px-6 flex items-center justify-center text-black"
						>
							Get started
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<footer class="z-0">
		<p class="mx-3">Kaizen Labs Inc 2022</p>
	</footer>
</div>

<style>
	h1 {
		background: #2980b9; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#ffffff,
			#6dd5fa,
			#2980b9
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#ffffff,
			#6dd5fa,
			#2980b9
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.cta {
		background-color: #85ffbd;
		background-image: linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%);
		width: fit-content;
	}

	.icon {
		width: 120px;
		height: 120px;
		border: 1px solid white;
		border-radius: 40px;
	}
	.icon:nth-child(2n) {
		animation-name: keyframes1;
		animation-iteration-count: infinite;
		transform-origin: 50% 10%;
	}

	.icon:nth-child(2n-1) {
		animation-name: keyframes2;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		transform-origin: 30% 5%;
	}

	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 80px;
		margin-bottom: 20px;
	}
	@keyframes keyframes1 {
		0% {
			transform: rotate(-1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(1.5deg);
			animation-timing-function: ease-out;
		}
	}

	@keyframes keyframes2 {
		0% {
			transform: rotate(1deg);
			animation-timing-function: ease-in;
		}

		50% {
			transform: rotate(-1.5deg);
			animation-timing-function: ease-out;
		}
	}
</style>
