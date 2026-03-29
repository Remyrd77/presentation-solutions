'use client';

import { useEffect, useState } from 'react';

export default function AdminServiceRequestsPage() {
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: '',
    urgency: '',
    scheduledDate: '',
    completedDate: '',
    estimatedCost: '',
    finalCost: '',
    technicianNotes: '',
  });

  useEffect(() => {
    fetchServiceRequests();
  }, [statusFilter, urgencyFilter]);

  const fetchServiceRequests = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (urgencyFilter) params.append('urgency', urgencyFilter);

      const response = await fetch(`/api/admin/service-requests?${params}`);
      if (response.ok) {
        const data = await response.json();
        setServiceRequests(data);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (request: any) => {
    setSelectedRequest(request);
    setUpdateData({
      status: request.status,
      urgency: request.urgency,
      scheduledDate: request.scheduledDate
        ? new Date(request.scheduledDate).toISOString().split('T')[0]
        : '',
      completedDate: request.completedDate
        ? new Date(request.completedDate).toISOString().split('T')[0]
        : '',
      estimatedCost: request.estimatedCost || '',
      finalCost: request.finalCost || '',
      technicianNotes: request.technicianNotes || '',
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedRequest) return;

    setIsUpdating(true);
    try {
      const response = await fetch(
        `/api/admin/service-requests/${selectedRequest.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        setIsModalOpen(false);
        fetchServiceRequests();
      } else {
        alert('Failed to update service request');
      }
    } catch (error) {
      console.error('Error updating service request:', error);
      alert('Failed to update service request');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service request?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/service-requests/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setServiceRequests(serviceRequests.filter((r) => r.id !== id));
      } else {
        alert('Failed to delete service request');
      }
    } catch (error) {
      console.error('Error deleting service request:', error);
      alert('Failed to delete service request');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Service Requests</h1>
        <p className="text-gray-600 mt-1">Manage service tickets</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency
            </label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Urgency Levels</option>
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Service Requests Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : serviceRequests.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">No service requests found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Urgency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.ticketNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {request.name}
                      </div>
                      <div className="text-sm text-gray-500">{request.email}</div>
                      <div className="text-sm text-gray-500">{request.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {request.serviceType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.projectorBrand} {request.projectorModel}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.urgency === 'URGENT'
                            ? 'bg-red-100 text-red-800'
                            : request.urgency === 'HIGH'
                            ? 'bg-orange-100 text-orange-800'
                            : request.urgency === 'NORMAL'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {request.urgency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          request.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : request.status === 'SCHEDULED'
                            ? 'bg-blue-100 text-blue-800'
                            : request.status === 'IN_PROGRESS'
                            ? 'bg-purple-100 text-purple-800'
                            : request.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Service Request Details - {selectedRequest.ticketNo}
              </h2>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span>{' '}
                    {selectedRequest.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{' '}
                    {selectedRequest.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span>{' '}
                    {selectedRequest.phone}
                  </p>
                  {selectedRequest.company && (
                    <p className="text-sm">
                      <span className="font-medium">Company:</span>{' '}
                      {selectedRequest.company}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-medium">Address:</span>{' '}
                    {selectedRequest.address}
                  </p>
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Service Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Service Type:</span>{' '}
                    {selectedRequest.serviceType}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Projector:</span>{' '}
                    {selectedRequest.projectorBrand}{' '}
                    {selectedRequest.projectorModel}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Issue Description:</span>
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {selectedRequest.issueDescription}
                  </p>
                  {selectedRequest.preferredDate && (
                    <p className="text-sm">
                      <span className="font-medium">Preferred Date:</span>{' '}
                      {formatDate(selectedRequest.preferredDate)}
                    </p>
                  )}
                </div>
              </div>

              {/* Update Form */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Update Service Request
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={updateData.status}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="SCHEDULED">Scheduled</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency
                    </label>
                    <select
                      value={updateData.urgency}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, urgency: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="LOW">Low</option>
                      <option value="NORMAL">Normal</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scheduled Date
                    </label>
                    <input
                      type="date"
                      value={updateData.scheduledDate}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          scheduledDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Completed Date
                    </label>
                    <input
                      type="date"
                      value={updateData.completedDate}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          completedDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Cost (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={updateData.estimatedCost}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          estimatedCost: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Final Cost (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={updateData.finalCost}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          finalCost: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 4500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technician Notes
                    </label>
                    <textarea
                      value={updateData.technicianNotes}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          technicianNotes: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Add technical notes..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
