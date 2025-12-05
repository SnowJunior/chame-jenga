<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import type { Map, Marker, Popup } from 'maplibre-gl';

	interface ProjectMarker {
		lat: number;
		lng: number;
		popupText?: string;
		projectId?: string;
		projectTitle?: string;
		projectDescription?: string;
		projectProgress?: number;
		projectImage?: string;
		onClick?: () => void;
	}

	let { lat = null, lng = null, zoom = 13, markers = [] }: {
		lat?: number | null;
		lng?: number | null;
		zoom?: number;
		markers?: ProjectMarker[];
	} = $props();

	let mapContainer: HTMLDivElement;
	let map: Map | null = null;
	let maplibreMarkers: Marker[] = [];

	const isBrowser = typeof window !== 'undefined';

	onMount(async () => {
		if (!isBrowser) return;

		// Determine center of the map
		let center: [number, number];
		if (markers.length > 0) {
			center = [markers[0].lng, markers[0].lat]; // MapLibre uses [lng, lat]
		} else if (lat !== null && lng !== null) {
			center = [lng, lat]; // MapLibre uses [lng, lat]
		} else {
			center = [0, 0];
		}

		// Initialize map
		map = new maplibregl.Map({
			container: mapContainer,
			style: {
				version: 8,
				sources: {
					'osm-tiles': {
						type: 'raster',
						tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
						tileSize: 256,
						attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					}
				},
				layers: [
					{
						id: 'osm-tiles-layer',
						type: 'raster',
						source: 'osm-tiles',
						minzoom: 0,
						maxzoom: 19
					}
				]
			},
			center: center,
			zoom: zoom
		});

		// Add navigation controls
		map.addControl(new maplibregl.NavigationControl(), 'top-right');

		// Function to create project hover popup HTML
		const createProjectPopupHTML = (marker: ProjectMarker): string => {
			if (!marker.projectTitle) {
				return marker.popupText || '';
			}

			return `
				<div class="project-popup" style="min-width: 200px; max-width: 300px;">
					${marker.projectImage ? `<img src="${marker.projectImage}" alt="${marker.projectTitle}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
					<h3 style="font-weight: 600; font-size: 16px; margin: 0 0 4px 0; color: #1f2937;">${marker.projectTitle}</h3>
					${marker.projectDescription ? `<p style="font-size: 13px; color: #6b7280; margin: 0 0 8px 0; line-height: 1.4;">${marker.projectDescription}</p>` : ''}
					${marker.projectProgress !== undefined ? `
						<div style="margin-top: 8px;">
							<div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280; margin-bottom: 4px;">
								<span>Progress</span>
								<span>${marker.projectProgress}%</span>
							</div>
							<div style="width: 100%; height: 6px; background-color: #e5e7eb; border-radius: 3px; overflow: hidden;">
								<div style="width: ${marker.projectProgress}%; height: 100%; background-color: #10b981; transition: width 0.3s;"></div>
							</div>
						</div>
					` : ''}
					<p style="font-size: 11px; color: #9ca3af; margin: 8px 0 0 0; font-style: italic;">Click to view details</p>
				</div>
			`;
		};

		// Function to update markers
		const updateMarkers = () => {
			if (!map) return;

			// Clear existing markers
			maplibreMarkers.forEach((marker) => marker.remove());
			maplibreMarkers = [];

			// Add markers
			if (markers.length > 0) {
				maplibreMarkers = markers.map((markerData) => {
					const marker = new maplibregl.Marker()
						.setLngLat([markerData.lng, markerData.lat])
						.addTo(map!);

					// Create popup for hover (project details) or simple text
					const popupContent = markerData.projectTitle
						? createProjectPopupHTML(markerData)
						: markerData.popupText || '';

					if (popupContent) {
						const popup = new maplibregl.Popup({
							closeOnClick: false,
							closeButton: false,
							closeOnMove: false,
							offset: 25,
							anchor: 'bottom'
						}).setHTML(popupContent);

						// Show popup on hover
						const markerElement = marker.getElement();
						if (markerElement) {
							let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
							let leaveTimeout: ReturnType<typeof setTimeout> | null = null;
							let isHoveringMarker = false;
							let isHoveringPopup = false;

							// Marker hover handlers
							markerElement.addEventListener('mouseenter', () => {
								isHoveringMarker = true;
								if (leaveTimeout) {
									clearTimeout(leaveTimeout);
									leaveTimeout = null;
								}
								hoverTimeout = setTimeout(() => {
									if (isHoveringMarker && !popup.isOpen()) {
										popup.setLngLat([markerData.lng, markerData.lat]);
										popup.addTo(map!);
									}
								}, 200);
							});

							markerElement.addEventListener('mouseleave', () => {
								isHoveringMarker = false;
								if (hoverTimeout) {
									clearTimeout(hoverTimeout);
									hoverTimeout = null;
								}
								// Close popup when leaving marker (unless hovering over popup)
								leaveTimeout = setTimeout(() => {
									if (!isHoveringMarker && !isHoveringPopup) {
										popup.remove();
									}
								}, 150);
							});

							// Popup hover handlers - attach when popup opens
							popup.on('open', () => {
								const popupElement = popup.getElement();
								if (popupElement) {
									popupElement.addEventListener('mouseenter', () => {
										isHoveringPopup = true;
										if (leaveTimeout) {
											clearTimeout(leaveTimeout);
											leaveTimeout = null;
										}
									});
									popupElement.addEventListener('mouseleave', () => {
										isHoveringPopup = false;
										leaveTimeout = setTimeout(() => {
											if (!isHoveringMarker && !isHoveringPopup) {
												popup.remove();
											}
										}, 200);
									});
								}
							});
						}

						// Handle click to navigate
						if (markerData.onClick) {
							const markerEl = marker.getElement();
							if (markerEl) {
								markerEl.addEventListener('click', () => {
									markerData.onClick?.();
								});
								markerEl.style.cursor = 'pointer';
							}
						}
					}

					return marker;
				});
			} else if (lat !== null && lng !== null) {
				const marker = new maplibregl.Marker()
					.setLngLat([lng, lat])
					.addTo(map!);
				maplibreMarkers.push(marker);
			}
		};

		// Wait for map to load
		map.on('load', updateMarkers);

		// React to prop changes
		$effect(() => {
			if (!map || !map.loaded()) return;

			// Update center if lat/lng changes
			if (lat !== null && lng !== null) {
				map.setCenter([lng, lat]);
			}

			// Update zoom if it changes
			map.setZoom(zoom);

			// Update markers
			updateMarkers();
		});
	});

	onDestroy(() => {
		if (map) {
			maplibreMarkers.forEach((marker) => marker.remove());
			maplibreMarkers = [];
			map.remove();
			map = null;
		}
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

	:global(.maplibregl-popup-content) {
		padding: 12px;
		font-size: 14px;
		font-family: system-ui, -apple-system, sans-serif;
	}

	:global(.maplibregl-popup-content .project-popup) {
		font-family: system-ui, -apple-system, sans-serif;
	}

	:global(.maplibregl-popup-content .project-popup img) {
		border-radius: 8px;
	}

	:global(.maplibregl-popup-tip) {
		border-top-color: white;
	}

	:global(.maplibregl-ctrl-group) {
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
