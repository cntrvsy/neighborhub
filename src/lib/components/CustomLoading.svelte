<script lang="ts">
    import { loading } from "$lib/stores/loading";

    let loadingMessageDefault: string ="One Moment please...";

    $: if ($loading.status === 'NAVIGATING'){
        setTimeout(()=>{
            if($loading.status === 'NAVIGATING'){
                $loading.status = 'LOADING'
            }   
        }, 650)
    }
</script>

{#if $loading.status === 'LOADING'}

<div class="flex justify-center items-center h-screen">
  
    <!-- new loader -->
    <div class="jelly-triangle">
        <div class="jelly-triangle__dot" ></div>
        <div class="jelly-triangle__traveler" ></div>
      </div>
      
      <svg width="0" height="0" class="jelly-maker">
        <defs>
          <filter id="uib-jelly-triangle-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="7.3"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
       <!--text message that can be customized  -->
    <div class="text-md text-transform: capitalize font-poppins font-semibold p-2">
        {#if $loading.message !==''}    
            {$loading.message}
        {:else}
            {loadingMessageDefault}
        {/if}
    </div>
</div>

{/if}

<style>
   .jelly-triangle {
  --uib-size: 44px;
  --uib-speed: 1.75s;
  --uib-color: #3b82f6;

  position: relative;
  height: var(--uib-size);
  width: var(--uib-size);
  filter: url('#uib-jelly-triangle-ooze');
}

.jelly-triangle__dot,
.jelly-triangle::before,
.jelly-triangle::after{
  content: '';
  position: absolute;
  width: 33%;
  height: 33%;
  background: var(--uib-color);
  border-radius: 100%;
}

.jelly-triangle__dot {
  top: 6%;
  left: 30%;
  animation: grow var(--uib-speed) ease infinite;
}

.jelly-triangle::before {
  bottom: 6%;
  right: 0;
  animation: grow var(--uib-speed) ease calc(var(--uib-speed) * -0.666)
    infinite;
}

.jelly-triangle::after {
  bottom: 6%;
  left: 0;
  animation: grow var(--uib-speed) ease calc(var(--uib-speed) * -0.333)
    infinite;
}

.jelly-triangle__traveler {
  position: absolute;
  top: 6%;
  left: 30%;
  width: 33%;
  height: 33%;
  background: var(--uib-color);
  border-radius: 100%;
  animation: triangulate var(--uib-speed) ease infinite;
}

.jelly-maker {
  width: 0;
  height: 0;
  position: absolute;
}

@keyframes triangulate {
  0%,
  100% {
    transform: none;
  }

  33.333% {
    transform: translate(120%, 175%);
  }

  66.666% {
    transform: translate(-95%, 175%);
  }
}

@keyframes grow {
  0%,
  100% {
    transform: scale(1.5);
  }

  20%,
  70% {
    transform: none;
  }
}
</style>