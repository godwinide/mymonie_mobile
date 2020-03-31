const burger = document.querySelector("#burgerNav");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector("main");

let state = {
    navOpen: false
};

burger.addEventListener("click", async e => {
    state.navOpen = !state.navOpen;
    const {navOpen} = state;
    if(navOpen) sidebar.classList.add("show-sidebar");
});

// close burgernav
main.addEventListener("click", e => {
    state.navOpen = !state.navOpen;
    sidebar.classList.remove("show-sidebar");
});
