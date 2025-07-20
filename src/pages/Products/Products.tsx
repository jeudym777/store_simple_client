import { useState } from "react";
import { useAddProduct } from "../hooks/useAddProduct";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const { mutate: addProduct, isPending } = useAddProduct();
  const { data: products } = useProducts();

  const handleAdd = () => {
    addProduct({ description, price, image_url: imageUrl });
    setDescription("");
    setPrice(1);
    setImageUrl("");
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">My products</h1>

      <div className="flex flex-col gap-2 mb-6">
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          className="border p-2 rounded"
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
          onClick={handleAdd}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Product"}
        </button>
      </div>

      <div className="space-y-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 flex items-center gap-4"
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.description}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <p className="font-semibold">{product.description}</p>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
