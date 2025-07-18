import { sortOilsByWeight } from './RecipeList';
import { SoapOil } from '../types/Recipe';

describe('sortOilsByWeight', () => {
  test('should sort oils by weight in descending order', () => {
    const oils: SoapOil[] = [
      { oilId: 'coconut', oilName: 'Kokosöl', weight: 100, percentage: 10 },
      { oilId: 'olive', oilName: 'Olivenöl', weight: 500, percentage: 50 },
      { oilId: 'palm', oilName: 'Palmöl', weight: 250, percentage: 25 },
      { oilId: 'castor', oilName: 'Rizinusöl', weight: 150, percentage: 15 }
    ];

    const sorted = sortOilsByWeight(oils);

    expect(sorted.map(oil => oil.weight)).toEqual([500, 250, 150, 100]);
    expect(sorted.map(oil => oil.oilName)).toEqual(['Olivenöl', 'Palmöl', 'Rizinusöl', 'Kokosöl']);
  });

  test('should handle empty array', () => {
    const oils: SoapOil[] = [];
    const sorted = sortOilsByWeight(oils);
    expect(sorted).toEqual([]);
  });

  test('should handle single oil', () => {
    const oils: SoapOil[] = [
      { oilId: 'coconut', oilName: 'Kokosöl', weight: 100, percentage: 100 }
    ];
    const sorted = sortOilsByWeight(oils);
    expect(sorted).toEqual(oils);
  });

  test('should handle oils with same weight', () => {
    const oils: SoapOil[] = [
      { oilId: 'coconut', oilName: 'Kokosöl', weight: 100, percentage: 50 },
      { oilId: 'olive', oilName: 'Olivenöl', weight: 100, percentage: 50 }
    ];
    const sorted = sortOilsByWeight(oils);
    expect(sorted.map(oil => oil.weight)).toEqual([100, 100]);
  });

  test('should not mutate original array', () => {
    const oils: SoapOil[] = [
      { oilId: 'coconut', oilName: 'Kokosöl', weight: 100, percentage: 10 },
      { oilId: 'olive', oilName: 'Olivenöl', weight: 500, percentage: 50 }
    ];
    const originalOrder = oils.map(oil => oil.weight);
    
    sortOilsByWeight(oils);
    
    expect(oils.map(oil => oil.weight)).toEqual(originalOrder);
  });
});