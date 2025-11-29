<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';

	export let lat: number | null = null;
	export let lng: number | null = null;
	export let zoom: number = 13;

	export let markers: { lat: number; lng: number; popupText?: string }[] = [];

	let mapContainer: HTMLDivElement;
	let map: LeafletMap | null = null;
	let leafletMarkers: LeafletMarker[] = [];

	const isBrowser = typeof window !== 'undefined';
	let L: typeof import('leaflet').default;

	onMount(async () => {
		if (!isBrowser) return;

		// Determine center of the map
		let center: [number, number];
		if (markers.length > 0) {
			center = [markers[0].lat, markers[0].lng];
		} else if (lat !== null && lng !== null) {
			center = [lat, lng];
		} else {
			center = [0, 0];
		}

		L = (await import('leaflet')).default;

		map = L.map(mapContainer).setView(center, zoom);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

		leafletMarkers.forEach((marker) => marker.remove());
		leafletMarkers = [];

		if (markers.length > 0) {
			leafletMarkers = markers.map(({ lat, lng, popupText }) => {
				const marker = L.marker([lat, lng]).addTo(map!);
				if (popupText) {
					marker.bindPopup(popupText);
				}
				return marker;
			});
		} else if (lat !== null && lng !== null) {
			leafletMarkers.push(L.marker([lat, lng]).addTo(map));
		}

		await tick();

		setTimeout(() => {
			map?.invalidateSize();
		}, 100);
	});
</script>

<div class="map-container" bind:this={mapContainer}></div>

<style>
	.map-container {
		height: 100%;
		width: 100%;
		border-radius: 12px;
		overflow: hidden;
	}
</style>
