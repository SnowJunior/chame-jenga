<script lang="ts">
	import { APIProvider, GoogleMap, Marker } from 'svelte-google-maps-api';
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';

	// size variables
	export let height: string = '400px';

	// Map options
	const mapOptions = {
		center: { lat: 35.6812362, lng: 139.7649361 },
		zoom: 10
	};

	// Marker position
	const position = { lat: 35.6812362, lng: 139.7649361 };

	function navigateToPage() {
		goto('/projects');
	}
</script>

<div style={`height: ${height}; width: 100%;`}>
	<APIProvider apiKey={PUBLIC_GOOGLE_MAPS_API_KEY}>
		<GoogleMap id="map" options={mapOptions} mapContainerStyle="width: 100%; height: 100%;">
			//TODO: Handle click action for marker to open project <details></details>
			<Marker {position} on:click={() => navigateToPage()} />
		</GoogleMap>
	</APIProvider>
</div>
