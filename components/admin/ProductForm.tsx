'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ProductFormProps {
  product?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function ProductForm({
  product,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'REFURBISHED',
    brand: product?.brand || '',
    model: product?.model || '',
    lumens: product?.lumens || '',
    resolution: product?.resolution || '',
    technology: product?.technology || '',
    throwRatio: product?.throwRatio || '',
    price: product?.price || '',
    rentalPrice: product?.rentalPrice || '',
    thumbnail: product?.thumbnail || '',
    condition: product?.condition || 'EXCELLENT',
    stock: product?.stock || 0,
    featured: product?.featured || false,
    active: product?.active !== false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Epson EB-X41 Refurbished"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Detailed product description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="REFURBISHED">Refurbished</option>
              <option value="NEW">New</option>
              <option value="RENTAL">Rental</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="NEW">New</option>
              <option value="LIKE_NEW">Like New</option>
              <option value="EXCELLENT">Excellent</option>
              <option value="GOOD">Good</option>
            </select>
          </div>

          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            placeholder="e.g., Epson, BenQ, Sony"
          />

          <Input
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            placeholder="e.g., EB-X41"
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Lumens"
            name="lumens"
            type="number"
            value={formData.lumens}
            onChange={handleChange}
            placeholder="e.g., 3600"
          />

          <Input
            label="Resolution"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            placeholder="e.g., XGA (1024x768)"
          />

          <Input
            label="Technology"
            name="technology"
            value={formData.technology}
            onChange={handleChange}
            placeholder="e.g., LCD, DLP, Laser"
          />

          <Input
            label="Throw Ratio"
            name="throwRatio"
            value={formData.throwRatio}
            onChange={handleChange}
            placeholder="e.g., 1.2:1"
          />
        </div>
      </div>

      {/* Pricing & Stock */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pricing & Stock
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Price (₹)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g., 25000"
          />

          <Input
            label="Rental Price (₹/day)"
            name="rentalPrice"
            type="number"
            step="0.01"
            value={formData.rentalPrice}
            onChange={handleChange}
            placeholder="e.g., 2500"
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            required
            placeholder="e.g., 5"
          />
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
        <div className="space-y-4">
          <Input
            label="Thumbnail URL"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="/images/products/product-thumbnail.jpg"
          />
          <p className="text-sm text-gray-500">
            Note: Image upload feature coming soon. For now, place images in
            public/images/products/ and enter the path.
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Feature this product on homepage
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Product is active (visible on website)
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
