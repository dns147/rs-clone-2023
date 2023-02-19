export const Header = {
  render: () => {
    return `
			<header class="header">
				<div class="header-container">
          <nav class="header-list">
            <a class="header-item" href="#/mainPage">Main Page</a>
						<a class="header-item" href="#/chooseGames">Play games</a>
            <a class="header-item" href="#/pumpkinGame">Save pumpkin</a>
            <a class="header-item" href="#/shooterGame">Ravens hunting</a>
						<a class="header-item" href="#/cemeteryGame">Cemetery</a>
					  <a class="header-item" href="#/zombieGame">Zombie walk</a>
					  <a class="header-item" href="#/results">Results</a>
					  <a class="header-item" href="#/about">About</a>
					  <a class="header-item" href="#/page2">page2</a>
					  <a class="header-item" href="#/page4">test</a>
            <a class="header-item" href="#/settings">settings</a>
          </nav>
				</div>
			</header>
    `;
  },
};

export const Content = {
  render: () => {
    return `
      <main class="main">
      </main>
    `;
  },
};

// export const Footer = {
//   render: () => {
//     return `
//       <footer class="footer">
//         <ul class="footer-list">
//           <li class="footer-item item-github">
//             <img src="https://svgshare.com/i/og2.svg" width="50" alt="icon" class="github-link">
//             <a href="https://github.com/dns147" class="footer-link" target="_blank">Denis Zhuravlev</a>
// 						<a href="https://github.com/Tatiana-Shylovich" class="footer-link" target="_blank">Tatiana Shylovich</a>
// 						<a href="https://github.com/avshir" class="footer-link" target="_blank">Anna Shirinskaya</a>
//           </li>
//           <li class="footer-item">
//             <span>2023</span>
//           </li>
//           <li class="footer-item">
//             <a href="https://rs.school/js/" target="_blank">
//               <img src="https://rs.school/images/rs_school_js.svg" width="60" alt="icon" class="rs-link">
//             </a>
//           </li>
//         </ul>
//       </footer>
//     `;
//   },
// };

export const Footer = {
  render: () => {
    return `
      <footer class="footer">
      </footer>
    `;
  },
};
