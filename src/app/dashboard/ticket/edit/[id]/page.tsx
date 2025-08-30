'use client';

import { use, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TicketForm from '@/components/dashboard/TicketForm';

interface TicketData {
  id: string;
  name: string;
  price: number;
  stock: number;
  eventId?: string;
  destinationId?: string;
  type?: 'event' | 'destination';
}

export default function EditTicket({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get('type') as 'event' | 'destination' || 'event';
  
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${id}?type=${type}`);
        if (response.ok) {
          const data = await response.json();
          setTicketData({
            id: data.id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            eventId: data.eventId,
            destinationId: data.destinationId,
            type: type,
          });
        }
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicket();
  }, [id, type]);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tiket tidak ditemukan</h1>
          <p className="text-muted-foreground">Tiket yang Anda cari tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <TicketForm 
      mode="edit" 
      ticketId={id}
      initialData={ticketData}
    />
  );
}
