<script lang="ts">
	export let rows: Array<{ id: number; name: string; amount: number; date: string }> = [];
</script>

<table class="min-w-full text-left text-sm">
	<thead class="border-b">
		<tr>
			<th class="px-4 py-2">Contributor</th>
			<th class="px-4 py-2">Amount</th>
			<th class="px-4 py-2">Date</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as r (r.id)}
			<tr class="border-b">
				<td class="px-4 py-2">{r.name}</td>
				<td class="px-4 py-2">${r.amount}</td>
				<td class="px-4 py-2">{new Date(r.date).toLocaleString()}</td>
			</tr>
		{/each}
	</tbody>
</table>
