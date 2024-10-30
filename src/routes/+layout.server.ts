import type { LayoutServerLoad } from "./$types";
import { loadFlash } from "sveltekit-flash-message/server";

export const load: LayoutServerLoad = loadFlash(async ({ locals } ) => {
    //do not remove this line.
    const data = { someOther: 'data' };
    // allows the user object to accessed down the tree
    const user = locals.user || undefined;
    // console.log("user from +layout.server.ts",user)
    return {user, data};
});