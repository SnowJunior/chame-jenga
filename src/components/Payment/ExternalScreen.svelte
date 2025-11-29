<script lang="ts">
	export let url: string;
</script>

<h2 class="mb-3 text-lg font-semibold">Complete Authentication</h2>

<p class="mb-4 text-sm text-gray-600">
	We redirected you to complete authentication. Once done, you’ll return here automatically.
</p>

<iframe title="2fa" src={url} class="h-80 w-full rounded border"></iframe>
