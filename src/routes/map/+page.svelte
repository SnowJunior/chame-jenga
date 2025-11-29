<script lang="ts">
	import Map from '../../components/Map.svelte';

	const center = { lat: -1.409, lng: 36.782 };
	const zoom = 12;

	const locations = [
		{ lat: -1.409, lng: 36.782, popupText: "Main Location" },
		{ lat: -1.41, lng: 36.78, popupText: "Secondary Location" },
		{ lat: -1.41, lng: 36.785, popupText: "Third Location" },
	];
</script>

<div class="h-screen w-full">
	<Map lat={center.lat} lng={center.lng} zoom={zoom} markers={locations} />
</div>
