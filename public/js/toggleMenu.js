const navItems = document.querySelector('#nav-items');

const toggleMenu = () =>{
    if (navItems.style.display == 'block'){
        navItems.style.display = 'none';
    }
    else{
        navItems.style.display = 'block';
    }
}

