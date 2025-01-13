const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}) => {
  const categories = ["Organic", "Fruits", "Vegetables", "Fastfood"];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
              className={`px-4 py-2 rounded-md w-full text-left ${
                selectedCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
