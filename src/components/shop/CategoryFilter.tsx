import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES, CategoryType } from '@/config/constants';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: CategoryType) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {PRODUCT_CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selected === category ? 'default' : 'outline'}
          onClick={() => onChange(category)}
          className="transition-base"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
