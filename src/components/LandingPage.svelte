<script>
	import { mockChannels } from '../model/Channel';
	let ctaIsHovered = false;

	const handleCtaHover = () => {
		ctaIsHovered = true;
	};
</script>

<div class="container">
	<nav class="flex w-full justify-end">
		<a href="/sign-in" class="opacity-50 hover:opacity-100 no-underline">Sign in</a>
	</nav>
	<div class="text-center mt-24 flex flex-col">
		<h1 class="text-6xl font-medium leading-relaxed">A home screen for your growing team.</h1>
		<h2 class="text-3xl mt-6">
			<span class="opacity-50">Create shortcuts to your team's daily apps with</span>
			<span class="opacity-100">Springboard</span><span class="opacity-50">.</span>
		</h2>
		<div
			on:focus
			on:blur
			on:mouseover={() => {
				ctaIsHovered = true;
			}}
			on:mouseout={() => {
				ctaIsHovered = false;
			}}
			class="cta mx-auto rounded-md cursor-pointer text-2xl font-medium py-3 px-6 flex items-center justify-center mt-10 text-black"
		>
			Play with a demo
		</div>
		<div class="mt-3 {ctaIsHovered ? 'opacity-100' : 'opacity-60'}">No sign-up required 🙂</div>
	</div>
	<section class="mt-24 grid md:grid-cols-4 grid-cols-2 gap-8 transition duration-200 ease-in-out ">
		{#each mockChannels.slice(0, 8) as channel, i (channel.id)}
			<div
				class="channel flex items-center justify-center flex-col text-center transition duration-200 ease-in-out"
			>
				<div class="text-6xl mb-4 icon flex items-center justify-center">
					<img
						alt={channel.title}
						class="transition w-16 h-16 duration-300 ease-in-out"
						src={channel.iconImageUrl}
					/>
				</div>
			</div>
		{/each}
	</section>
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
