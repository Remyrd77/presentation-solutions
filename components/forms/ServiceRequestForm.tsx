'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
  serviceRequestSchema,
  type ServiceRequestFormData,
} from '@/lib/validations';

interface ServiceRequestFormProps {
  onSuccess?: (ticketNo: string) => void;
}

export default function ServiceRequestForm({
  onSuccess,
}: ServiceRequestFormProps) {
  const [formData, setFormData] = useState<ServiceRequestFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    serviceType: 'REPAIR',
    projectorBrand: '',
    projectorModel: '',
    issueDescription: '',
    urgency: 'NORMAL',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNo, setTicketNo] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate form data
      const validatedData = serviceRequestSchema.parse(formData);

      // Submit to API
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.details) {
          // Handle Zod validation errors
          const fieldErrors: Record<string, string> = {};
          errorData.details.forEach((error: any) => {
            fieldErrors[error.path[0]] = error.message;
          });
          setErrors(fieldErrors);
        } else {
          throw new Error(errorData.error || 'Failed to submit service request');
        }
        return;
      }

      // Success
      const data = await response.json();
      setIsSuccess(true);
      setTicketNo(data.ticketNo);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        serviceType: 'REPAIR',
        projectorBrand: '',
        projectorModel: '',
        issueDescription: '',
        urgency: 'NORMAL',
        preferredDate: '',
      });

      if (onSuccess) {
        onSuccess(data.ticketNo);
      }
    } catch (error: any) {
      if (error.name === 'ZodError') {
        // Handle Zod validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          submit: error.message || 'Failed to submit service request',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Service Request Submitted!
        </h3>
        <p className="text-gray-700 mb-4">
          Your ticket number is:{' '}
          <span className="font-bold text-primary-600">{ticketNo}</span>
        </p>
        <p className="text-gray-600 mb-6">
          We'll contact you within 24 hours to schedule your service appointment.
        </p>
        <Button
          onClick={() => {
            setIsSuccess(false);
            setTicketNo('');
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {errors.submit}
          </div>
        </div>
      )}

      {/* Customer Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Customer Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            error={errors.name}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            error={errors.email}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 98765 43210"
            error={errors.phone}
          />

          <Input
            label="Company (Optional)"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company Name"
            error={errors.company}
          />

          <div className="md:col-span-2">
            <Input
              label="Complete Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Street, City, State, PIN Code"
              error={errors.address}
            />
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Service Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.serviceType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="REPAIR">Repair</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="INSTALLATION">Installation</option>
              <option value="CONSULTATION">Consultation</option>
              <option value="SMART_SETUP">Smart Room Setup</option>
            </select>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency <span className="text-red-500">*</span>
            </label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.urgency ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="LOW">Low - Can wait a week</option>
              <option value="NORMAL">Normal - Within 3-5 days</option>
              <option value="HIGH">High - Within 1-2 days</option>
              <option value="URGENT">Urgent - Same day service</option>
            </select>
            {errors.urgency && (
              <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>
            )}
          </div>

          <Input
            label="Projector Brand"
            name="projectorBrand"
            value={formData.projectorBrand}
            onChange={handleChange}
            required
            placeholder="e.g., Epson, BenQ, Sony"
            error={errors.projectorBrand}
          />

          <Input
            label="Projector Model"
            name="projectorModel"
            value={formData.projectorModel}
            onChange={handleChange}
            required
            placeholder="e.g., EB-X41"
            error={errors.projectorModel}
          />

          <div className="md:col-span-2">
            <Input
              label="Preferred Service Date (Optional)"
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              error={errors.preferredDate}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              required
              rows={5}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.issueDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please describe the issue in detail... (minimum 20 characters)"
            />
            {errors.issueDescription && (
              <p className="mt-1 text-sm text-red-600">
                {errors.issueDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1" isLoading={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Service Request'}
        </Button>

        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi, I need projector service assistance`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </form>
  );
}
