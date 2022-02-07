<div class="loader" />

<style>
	.loader {
		width: 40px;
		height: 40px;
		background: linear-gradient(currentColor 0 0), linear-gradient(currentColor 0 0),
			linear-gradient(currentColor 0 0), linear-gradient(currentColor 0 0);
		background-size: 21px 21px;
		background-repeat: no-repeat;
		animation: loading 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
	}
	@keyframes loading {
		0% {
			background-position: 0 0, 100% 0, 100% 100%, 0 100%;
		}
		33% {
			background-position: 0 0, 100% 0, 100% 100%, 0 100%;
			width: 60px;
			height: 60px;
		}
		66% {
			background-position: 100% 0, 100% 100%, 0 100%, 0 0;
			width: 60px;
			height: 60px;
		}
		100% {
			background-position: 100% 0, 100% 100%, 0 100%, 0 0;
		}
	}
</style>
