<script lang="ts">

    import { getDrawerStore } from '@skeletonlabs/skeleton';
    
    const drawerStore = getDrawerStore();
    
    function drawerClose(): void {
        drawerStore.close();
    }
    
</script>
    
    <nav class="list-nav p-4">
        <ul>
            <li><a href="/" on:click={drawerClose} >Home</a></li>
            <li><a href="/About_Us" on:click={drawerClose} >About us</a></li>
            <li><a href="/Courses" on:click={drawerClose} >Courses</a></li>
            <li><a href="/Branches" on:click={drawerClose} >Branches</a></li>
            <li><a href="/Contact_Us" on:click={drawerClose} >Contact us</a></li>
            <!-- <li><a href="/Portal" on:click={drawerClose} >Portal</a></li> -->
        </ul>
    </nav>
    