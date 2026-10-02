export type SizeOption = 'Tall' | 'Grande' | 'Venti';
export type MilkOption = 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Coconut Milk' | 'Nonfat Milk';
export type IceOption = 'No Ice' | 'Less Ice' | 'Regular Ice' | 'Extra Ice';
export type SweetnessOption = 'Unsweetened' | '2 Pumps' | '3 Pumps' | '4 Pumps';

export interface CustomizationOptions {
  size: SizeOption;
  milk: MilkOption;
  ice: IceOption;
  syrupPumps: SweetnessOption;
  whippedCream: boolean;
  extraMatchaDrizzle: boolean;
  espressoShot: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Matcha & Tea Specials' | 'Espresso & Brews' | 'Frappuccino® Blended' | 'Cold Brew & Nitro' | 'Pastries & Food';
  price: number;
  calories: number;
  description: string;
  detailedNotes?: string;
  imageUrl: string;
  badge?: string;
  badgeType?: 'featured' | 'reserve' | 'classic' | 'refresher';
  rating: number;
  reviewCount: string;
  defaultCustomization: CustomizationOptions;
  ingredients: string[];
}

export interface CartItem {
  id: string; // unique cart instance id
  productId: string;
  product: Product;
  quantity: number;
  customization: CustomizationOptions;
  itemTotalPrice: number;
}

export type ViewTab = 'showcase' | 'menu' | 'design-studio' | 'orders' | 'about';

export interface DraggableIngredient {
  id: string;
  name: string;
  icon: string;
  color: string;
  calorieDelta: number;
  priceDelta: number;
  category: 'base' | 'flavor' | 'topping' | 'accessory';
}
