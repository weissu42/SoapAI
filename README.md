# SoapAI - Soap Recipe Calculator

A React-based web application for creating, managing, and calculating soap recipes with automatic saponification calculations.

## Features

### 🧪 Recipe Management
- **Create New Recipes**: Build soap recipes with multiple oils and ingredients
- **Edit Existing Recipes**: Modify saved recipes with full form validation
- **Recipe List**: View all recipes with detailed calculations and properties
- **Recipe Validation**: Automatic warnings for recipes with problematic characteristics

### 🔬 Advanced Calculations
- **Automatic Saponification**: Calculates required NaOH based on oil saponification values
- **Superfat Control**: Configurable superfat percentage (default 10%)
- **Citric Acid Support**: Optional citric acid with automatic additional NaOH calculation
- **Water Percentage**: Configurable water amount (default 30% of oil weight)
- **Soap Properties**: Real-time calculation of hardness, cleansing, conditioning, bubbly, creamy, iodine, and INS values

### 📊 Oil Database
Comprehensive database of 12 common soap-making oils with accurate saponification values:
- Coconut Oil, Palm Oil, Olive Oil, Castor Oil
- Shea Butter, Cocoa Butter, Sunflower Oil, Avocado Oil
- Sweet Almond Oil, Jojoba Oil, Safflower Oil, Walnut Oil

### 🎯 Smart Validation
- **Hardness Warnings**: Alerts for too soft (< 29) or too hard (> 54) soaps
- **Cleansing Warnings**: Prevents overly aggressive cleansing (> 22)
- **Conditioning Warnings**: Ensures proper conditioning range (44-69)
- **Lather Warnings**: Optimal bubbly properties (14-46)

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Create React App
- **Testing**: Jest
- **Styling**: CSS with responsive design
- **State Management**: React Hooks and Context

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SoapAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Usage

### Creating a Recipe

1. **Basic Information**
   - Enter recipe name and description
   - Set superfat percentage (recommended: 5-15%)
   - Configure water percentage (recommended: 25-40%)
   - Add citric acid percentage if desired (0-5%)

2. **Add Oils**
   - Select oil from dropdown
   - Enter weight in grams
   - Add multiple oils as needed
   - View automatic percentage calculations

3. **Additional Ingredients**
   - Add fragrances, colorants, or other additives
   - Specify amounts and units

4. **Review Calculations**
   - View required NaOH amount
   - Check soap properties
   - Review any warnings

### Understanding Soap Properties

- **Hardness (29-54)**: Physical hardness of the bar
- **Cleansing (0-22)**: Cleaning power, higher can be drying
- **Conditioning (44-69)**: Moisturizing properties
- **Bubbly (14-46)**: Large, fluffy lather
- **Creamy (16-48)**: Rich, stable lather
- **Iodine (41-70)**: Indicates softness of oils
- **INS (136-170)**: Overall soap quality indicator

## Testing

Run the test suite:
```bash
npm test
```

Build for production:
```bash
npm run build
```

## Calculations

The application uses precise saponification calculations:

### NaOH Formula
```
NaOH = (Total SAP Value × Oil Weight ÷ 1000) × (1 - Superfat ÷ 100)
```

### Citric Acid Neutralization
```
Additional NaOH = Citric Acid Weight × 0.624
```

### Water Amount
```
Water = Oil Weight × Water Percentage ÷ 100
```

## Safety Notes

⚠️ **Important**: This application provides calculations for soap making. Always:
- Double-check calculations with multiple sources
- Use proper safety equipment when handling lye
- Follow safe soap-making practices
- Test recipes in small batches first

## Architecture

The application follows React best practices with:
- **Component Composition**: Small, focused components
- **Custom Hooks**: Reusable state logic
- **TypeScript**: Type safety throughout
- **Separation of Concerns**: Clear separation between UI, state, and calculations
- **Comprehensive Testing**: Unit tests for critical calculations

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include recipe details and expected vs actual behavior