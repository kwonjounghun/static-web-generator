import render from "./render.mjs";

function router(routeMap) {
    const path = document.location.pathname;

    function pageChange() {
        const path = document.location.pathname;
        if (routeMap[path]) {
            render(routeMap[path]());
        }
    }

    window.addEventListener('popstate', pageChange);

    window.addEventListener('routepush', pageChange)

    render(routeMap[path]());
};

export default router;