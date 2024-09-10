export enum VariantEnum {
  HUBERT = 'hubi',
  MARTA = 'tusia',
}

export const translateVariant = (variant: VariantEnum | string, iconOnly = false) => {
  switch (variant) {
    case VariantEnum.HUBERT:
      return iconOnly ? '🐴' : '🐴 Hubi';
    case VariantEnum.MARTA:
      return iconOnly ? '🦄' : '🦄 Tusia';
  }
};

export enum MealEnum {
  BREAKFAST = 'breakfast',
  SECOND_BREAKFAST = 'second_breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
}

export const translateMeal = (meal: MealEnum | string) => {
  switch (meal) {
    case MealEnum.BREAKFAST:
      return '🍳 Breakfast';
    case MealEnum.SECOND_BREAKFAST:
      return '🥞 Second breakfast';
    case MealEnum.LUNCH:
      return '🥪 Lunch';
    case MealEnum.DINNER:
      return '🍲 Dinner';
  }
};
