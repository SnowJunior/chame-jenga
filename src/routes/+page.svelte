<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import Card from '../components/Card.svelte';

	let search = '';
	let cards = [
		{
			image: 'https://source.unsplash.com/random/400x300?finance',
			title: 'Group Savings',
			description: 'Manage your group savings with transparency and ease.',
			totalReceived: 1000,
			progress: 45
		},
		{
			image: 'https://source.unsplash.com/random/400x300?community',
			title: 'Community Projects',
			description: 'Support local community projects for sustainable growth.',
			totalReceived: 5000,
			progress: 80
		},
		{
			image: 'https://source.unsplash.com/random/400x300?money',
			title: 'Loan Requests',
			description: 'Track and approve loan requests within your chama.',
			totalReceived: 2000,
			progress: 60
		},
		{
			image: 'https://source.unsplash.com/random/400x300?investment',
			title: 'Investments',
			description: 'Grow your funds through collective investments.',
			totalReceived: 3000,
			progress: 25
		}
	];

	$: filteredCards = cards.filter((card) =>
		card.title.toLowerCase().includes(search.toLowerCase())
	);

	const handleView = (title: string) => {
		alert(`Viewing ${title}`);
	};
</script>

<Navbar />

<main class="min-h-screen bg-gray-50 p-6">
	<div class="mx-auto max-w-7xl">
		<input
			type="text"
			placeholder="Search..."
			bind:value={search}
			class="mb-6 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-1/2"
		/>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each filteredCards as card, i (card.title + i)}
				<Card
					image={card.image}
					title={card.title}
					description={card.description}
					totalReceived={card.totalReceived}
					progress={card.progress}
					onView={() => handleView(card.title)}
				/>
			{/each}
		</div>
	</div>
</main>
