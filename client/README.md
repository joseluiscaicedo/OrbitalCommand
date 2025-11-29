# 🛰️ Orbital Command

A real-time space station resource management dashboard with cyberpunk aesthetics. Monitor critical resources like oxygen, water, food, and parts while managing resupply operations through an interactive control interface.

## ✨ Features

- **Real-time Resource Monitoring**: Track oxygen, water, food, and parts levels with live updates
- **WebSocket Communication**: Real-time bidirectional communication using Socket.IO
- **Critical Alert System**: Automatic alerts when resources fall below critical thresholds
- **Resupply Management**: Request and track resupply operations for any resource
- **Cyberpunk UI**: Neon-styled glassmorphic components with space-themed backdrop
- **Activity Logs**: Real-time logging of all system events and operations

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.IO** - WebSocket server
- **TypeScript** - Type safety

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🎮 Usage

### Development Mode

Run both client and server concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Client only (runs on port 5173)
npm run dev:client

# Server only (runs on port 4000)
npm run dev:server
```

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
OrbitalCommand/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/       # Basic UI components
│   │   │   ├── molecules/   # Composite components
│   │   │   └── organisms/   # Complex feature components
│   │   ├── services/        # API and socket services
│   │   ├── App.tsx          # Main application component
│   │   └── types.ts         # TypeScript type definitions
│   └── package.json
└── server/
    └── server.ts            # Socket.IO server
```

## 🎨 Component Architecture

### Atoms
- `CyberButton` - Styled button with neon effects
- `GlassPanel` - Glassmorphic container
- `NeonText` - Glowing text component
- `ProgressBar` - Animated progress indicator
- `SpaceBackdrop` - Animated space background

### Molecules
- `InfoModule` - Status information display
- `LogEntry` - Individual log item
- `ResourceCard` - Resource monitoring card

### Organisms
- `ControlGrid` - Resource control panel
- `Header` - Application header with status
- `ServerLog` - Activity log display

## 🔌 WebSocket Events

### Client → Server
- `resupply_request` - Request resource resupply

### Server → Client
- `connect` - Connection established
- `disconnect` - Connection lost
- `resource_update` - Resource levels updated
- `log_update` - New log entry

## 📊 Resource Management

Each resource has:
- Current value (0-100%)
- Critical threshold
- Depletion rate
- Resupply status

Resources automatically deplete over time and trigger alerts when critical.

## 🎯 Future Enhancements

- Turso database integration for persistent logs
- User authentication
- Multiple space station support
- Historical data visualization
- Resource prediction algorithms

## 📄 License

MIT

## 👥 Author

Jose Caicedo
