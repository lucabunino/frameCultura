<script>
import { page } from '$app/stores';
</script>

<div>
	<h1 class="gaisyr-34">{$page.status}: {$page.error.message}</h1>
	<a href="/" class="btn">← Go to homepage</a>
</div>