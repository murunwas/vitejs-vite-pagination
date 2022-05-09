<script>
import {paginate,next,back,pageSize,goTo} from "./lib"
</script>
<button on:click={next} disabled={$paginate.disableNext}>next</button>

		{#each Array.from({length:$paginate.totalPages}, (v, i) => ((i+1))) as page}
		<button on:click={()=>goTo(page)} >{page}</button>
		{/each}


<button on:click={back}  disabled={$paginate.disableBack}>back</button>
<select bind:value={$pageSize}>
		{#each Array.from({length: 10}, (v, i) => ((i+1)*10)) as question}
			<option value={question}>
				{question}
			</option>
		{/each}
</select>
<pre>{JSON.stringify($paginate,null,2)}</pre>
cengy...