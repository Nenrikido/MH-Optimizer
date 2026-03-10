# Monster Hunter Build Optimizer

A collection of build optimization tools for Monster Hunter games using linear programming.

## 🎮 Games Supported

### [Monster Hunter Wilds](./wilds/) ⭐ **Active Development**
Full-featured build optimizer with modern React + TypeScript frontend and Flask backend.
https://mh-opti.nenri.fr/

**Features:**
- 🎯 Skill-based optimization with custom weights
- 🛡️ Set bonus requirements (min pieces per set)
- 💎 Custom amulet support with skill combinations
- ⚔️ Weapon-specific builds
- 🔄 Multiple build solutions (up to 5)
- 🌐 Modern web interface with Material-UI
- 💾 Local configuration save/load
- ⚡ Real-time optimization with visual results

**Tech Stack:** React 18, TypeScript, Material-UI, Flask, PuLP

➡️ [View Wilds Documentation](./wilds/README.md)

### [Monster Hunter Rise](./rise/)
Legacy Python script for Monster Hunter Rise build optimization.

**Features:**
- Basic skill optimization
- Armor piece filtering
- Command-line interface

**Tech Stack:** Python, PuLP

## 🚀 Quick Start

### Monster Hunter Wilds

```bash
# Frontend setup
cd wilds/frontend
npm install
npm run build

# Backend setup
cd wilds/backend
pip install flask pulp tqdm
python optimizer_app.py

# Access at http://localhost:5000/
```

### Monster Hunter Rise

```bash
cd rise
python opti_rise.py
```

## 📁 Project Structure

```
MH-Optimizer/
├── wilds/                 # MH Wilds optimizer (React + Flask)
│   ├── frontend/         # React TypeScript app
│   │   ├── components/   # UI components
│   │   ├── model/        # TypeScript interfaces
│   │   └── dist/         # Production build
│   ├── backend/          # Flask API
│   │   ├── optimizer_app.py
│   │   └── opti_wilds.py
│   ├── db/               # Game data (skills, sets, items)
│   └── full_db/          # Complete game database
├── rise/                 # MH Rise optimizer (Python script)
│   ├── opti_rise.py
│   └── *.json            # Armor data
└── README.md            # This file
```

## 📝 Data Sources

### Wilds
Data extracted from game files and community databases:
- [LartTyler/mhdb-wilds-data](https://github.com/LartTyler/mhdb-wilds-data) - Primary data source
- Auto-updated with game patches

### Rise
- Manual data extraction
- Community-maintained JSON files

## 📄 License

This project is for educational and personal use. Monster Hunter is a trademark of CAPCOM Co., Ltd.

## 🙏 Credits

- **Game Data:** CAPCOM & [mhdb-wilds-data](https://github.com/LartTyler/mhdb-wilds-data)
- **Optimization:** PuLP linear programming library
- **Author:** @nenrikido (Discord)

## 📮 Contact

For questions, suggestions, or bug reports:
- Discord: @nenrikido
- Issues: [GitHub Issues](../../issues)

---

**Note:** This tool is currently in **beta**. The Wilds optimizer is actively maintained, while Rise support is legacy/maintenance mode.

