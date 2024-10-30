<script lang="ts">
  // @ts-nocheck
  import SuperForm from '$lib/components/superforms/Form.svelte';
  import TextField from '$lib/components/superforms/TextField.svelte';
  import { fly,fade } from 'svelte/transition';
  
  export let data

  let { user, SignIn_Form, SignUp_Form } = data;
  $: ({ user, SignIn_Form, SignUp_Form } = data);

  
  let componentState = 'SignIn';
  // tiny state machine
  const componentStates = {
    SignUp: 'SignUp',
    SignIn: 'SignIn',
  }
  // handles the switching between the two forms 
  function toggleSign_State(state:string) {
    componentState = state;
    console.log("changed to")
    console.log(componentState)
  }
</script>
      
     
<div class="mx-auto max-w-screen-2xl">
  <div class="flex item-center justify-center h-screen p-10">

  <!-- Grid for smooth transition -->
    <div class="transition-container z-20">
      {#if componentState === componentStates.SignIn}
      <div 
        in:fly={{ x: 250, duration: 700, delay:500 }} 
        out:fade={{ duration:400}}>

          <!-- Sign In: super form -->
          <section>
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">

              <!-- CTA portion -->
              <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 class="title-font text-5xl italic gradient-heading">Welcome Back!</h1>
                <p class="leading-relaxed text-lg mt-4">Your journey with us was just the beginning. To continue enjoying the boundless benefits of our platform, we invite you to sign in once again.</p>
                <br/>

                <!-- toggle to Sign Up -->
                <button class="btn variant-ghost-secondary" on:click={() => toggleSign_State("SignUp")}> don't have an account? </button>
              </div>
                <div class="lg:w-2/6 md:w-1/2 0 flex flex-col md:ml-auto w-full mt-10 md:mt-0 ">
                  <!-- super form Sign In -->
                  <div class=" card p-4 ">
                    <SuperForm
                      action = "?/signIn"
                      data= {data?.SignIn_Form}
                      invalidateAll={false}
                      let:form let:message
                    >
      
                      {#if message}
                        <div class= "alert
                          {message.status >= 400 ? 'variant-filled-error': 'variant-filled-success'}
                          text-white p-4 rounded-md"
                        > 
                          {message.text}
                        </div>
                      {/if}
                      
                        <!-- for email -->
                        <TextField type="text" {form} field="email" label="E-Mail" custom_placeholder="name@text.com"></TextField>
                        <!-- for password -->
                        <TextField type="password" {form} field="password" label="Password"></TextField>
      
                        <div class= "flex items-center justify-center py-4">
                          <button type="submit" class="btn variant-filled-primary px-8">Sign In</button>
                        </div>
                    </SuperForm>
                    <a href="/auth/reset" class="text-xs mt-3 text-warning-400">Click here if you forgot your password</a>
                  </div>
                </div>
            </div>
          </section>
        </div>
      {:else}
        <div 
          in:fly={{ x: 250, duration:700, delay:500 }}
          out:fade={{ duration:400}}>
          <!-- Sign UP: super form -->
          <section>
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">

              <!-- CTA portion -->
              <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 class="title-font text-5xl italic gradient-heading">Are you New?</h1>
                <p class="leading-relaxed text-lg mt-4">Please establish an account with us in order to take advantage of our platform's features. The journey you took with us was only the start. </p>
                <br/>

                <!-- toggle to Sign in -->
                <button class="btn variant-ghost-secondary" on:click={() => toggleSign_State("SignIn")}>Already have an account? </button>
              </div>
                <div class="lg:w-2/6 md:w-1/2 0 flex flex-col md:ml-auto w-full mt-10 md:mt-0 ">
                  <!-- super form Sign Up -->
                  <div class="card p-4 ">
                    <SuperForm
                      action = "?/signUp"
                      data= {data?.SignUp_Form}
                      invalidateAll={false}
                      let:form let:message
                    >
      
                        {#if message}
                        <div class= "alert
                          {message.status >= 400 ? 'variant-filled-error': 'variant-filled-success'}
                          text-white p-4 rounded-md"
                        > 
                          {message.text}
                          </div>
                        {/if}
                      
                        <!-- for email -->
                        <TextField type="text" {form} field="email" label="E-Mail" custom_placeholder="name@text.com"></TextField>
                        <!-- for password -->
                        <TextField type="password" {form} field="password" label="Password"></TextField>
                        <!-- for password  confirm-->
                        <TextField type="password" {form} field="confirm" label="Confirm Password"></TextField>
                        <div class= "flex items-center justify-center py-4">
                          <button type="submit" class="btn variant-filled-primary px-8">Sign Up</button>
                        </div>
                    </SuperForm>
                    <a href="/auth/reset" class="text-xs mt-3 text-warning-400">Click here if you forgot your password</a>
                  </div>
                </div>
            </div>
          </section>
        </div>
      {/if}
  </div> 
</div>


</div>



<style>
.transition-container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}

.transition-container > * {
  grid-row: 1;
  grid-column: 1;
}


</style>