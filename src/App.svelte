<script>
import {paginate,next,back,pageSize,goTo} from "./lib"
import Pagination from "./lib/Pagination.svelte"

const pages=Array.from({length:$paginate.totalPages}, (v, i) => ((i+1)));
</script>

    <Pagination 
    {pages} 
    currentPage={$paginate.currentPage}
    on:goto={({detail})=>goTo(detail)}
    on:next={next}
    on:back={back}
    />

<select bind:value={$pageSize} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
		{#each Array.from({length: 10}, (v, i) => ((i+1)*10)) as question}
			<option value={question}>
				{question}
			</option>
		{/each}
</select>
<pre>{JSON.stringify($paginate,null,2)}</pre>
cengy...