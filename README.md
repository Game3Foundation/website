# Game3 Foundation Website

This repository contains the official website for the Game3 Foundation, an organization dedicated to advancing research and development for video game creators at the intersection of web3, blockchain, and AI technologies.

## About Game3 Foundation

Game3 Foundation is pioneering the next generation of gaming experiences through:

- **Research initiatives** focused on blockchain gaming, AI integration, and emergent gameplay
- **Open-source development** of tools and frameworks for game developers
- **Grant programs** supporting innovative projects in the web3 gaming space
- **Community building** connecting creators, players, and technologists

Our mission is to enable a new generation of game creators and players to build and experience immersive worlds that are more open, fair, and innovative.

## Technologies

This website is built with:

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component system
- [Three.js](https://threejs.org/) - JavaScript 3D library
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection UI
- [wagmi](https://wagmi.sh/) - React hooks for Ethereum

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 8.x or later
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/game3foundation/website.git
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure
```markdown
game3/www/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable components
│   │   ├── effects/   # Visual effects components
│   │   ├── hero/      # Hero section components
│   │   ├── layout/    # Layout components (header, footer)
│   │   ├── sections/  # Page section components
│   │   └── ui/        # UI components (buttons, cards, etc.)
│   ├── lib/           # Utility functions
│   └── providers/     # Context providers
├── LICENSE            # GPL-3.0 license
├── package.json       # Project dependencies
└── README.md          # Project documentation
```
## Contributing
We welcome contributions from the community! Please read our Code of Conduct before contributing.

## License
This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.


