<script lang="ts">
	import Map from '../../components/Map.svelte';
	import { goto } from '$app/navigation';

	const center = { lat: -1.409, lng: 36.782 };
	const zoom = 8;

	// Project data with coordinates (Kenya locations)
	const projects = [
		{
			id: 'p-001',
			title: 'Community Water Pipeline',
			description: '12km water pipeline for local villages.',
			image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80',
			progress: 65,
			category: 'Infrastructure',
			village: 'Kisumu West',
			lat: -0.0917,
			lng: 34.7680 // Kisumu coordinates
		},
		{
			id: 'p-002',
			title: 'School Renovation',
			description: 'Renovation of 8 classrooms and sanitation units.',
			image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80',
			progress: 40,
			category: 'Education',
			village: 'Ngong',
			lat: -1.3614,
			lng: 36.6500 // Ngong coordinates
		},
		{
			id: 'p-003',
			title: 'Rural Solar Grid',
			description: 'Solar electrification for 200 households.',
			image: 'https://images.unsplash.com/photo-1584270354949-1a21962a92f0?q=80',
			progress: 85,
			category: 'Energy',
			village: 'Bondo',
			lat: 0.0950,
			lng: 34.2778 // Bondo coordinates
		},
		{
			id: 'p-004',
			title: 'Health Center Expansion',
			description: 'New maternity wing and equipment upgrades.',
			image: 'https://images.unsplash.com/photo-1580281657527-47c521c3a0b9?q=80',
			progress: 55,
			category: 'Health',
			village: 'Eldoret',
			lat: 0.5143,
			lng: 35.2698 // Eldoret coordinates
		}
	];

	const markers = projects.map((project) => ({
		lat: project.lat,
		lng: project.lng,
		projectId: project.id,
		projectTitle: project.title,
		projectDescription: project.description,
		projectProgress: project.progress,
		projectImage: project.image,
		onClick: () => {
			goto(`/projects/${project.id}`);
		}
	}));
</script>

<div class="h-screen w-full">
	<Map lat={center.lat} lng={center.lng} zoom={zoom} markers={markers} />
</div>
