<script lang="ts">
	import { getDrawerStore, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	
	const drawerStore = getDrawerStore();

	function drawerClose(): void {
     drawerStore.close();
	}

</script>

<TabGroup justify="justify-center">
	<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
	<TabAnchor href="/About_Us" selected={$page.url.pathname === '/About_Us'}>About us</TabAnchor>
	<TabAnchor href="/Courses" selected={$page.url.pathname === '/Courses'}>Courses</TabAnchor>
	<TabAnchor href="/Branches" selected={$page.url.pathname === '/Branches'}>Branches</TabAnchor>
	<TabAnchor href="/Contact_Us" selected={$page.url.pathname === '/Contact_Us'}>Contact us</TabAnchor>
</TabGroup>