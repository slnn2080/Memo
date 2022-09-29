<script>
	// 声明props count 默认值为3
	export let count = 3
</script>

<main>
{#if count > 0}
	<p>countdown ... {count}</p>
	<svelte:self count={count - 1}/>
{/if}
</main>


<style>

</style>