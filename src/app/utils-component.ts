export function hideUserMenu(userMenu: HTMLElement): void {
	userMenu.classList.remove('active');
	userMenu.animate([{ height: '80px' }, { height: '0px' }], {
		duration: 300,
	});
	setTimeout(() => {
		userMenu.style.display = 'none';
	}, 250);
}

export function showUserMenu(userMenu: HTMLElement): void {
	userMenu.style.display = 'flex';
	userMenu.classList.add('active');
	userMenu.animate([{ height: '0px' }, { height: '80px' }], {
		duration: 300,
	});
}