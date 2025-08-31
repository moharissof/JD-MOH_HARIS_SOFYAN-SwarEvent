/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Ticket, MapPin, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventTicket {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  event: {
    id: string;
    title: string;
  };
  _count: {
    orders: number;
  };
}

interface DestinationTicket {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  destination: {
    id: string;
    name: string;
  };
  _count: {
    orders: number;
  };
}

interface TicketsData {
  eventTickets: EventTicket[];
  destinationTickets: DestinationTicket[];
}

export default function TicketDashboard() {
  const [tickets, setTickets] = useState<TicketsData>({
    eventTickets: [],
    destinationTickets: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const refreshTickets = async () => {
    try {
      const response = await fetch('/api/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error refreshing tickets:', error);
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets');
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          throw new Error('Failed to fetch tickets');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        toast({
          title: "Error",
          description: "Gagal memuat data tiket",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (ticketId: string, type: 'event' | 'destination') => {
    if (!confirm('Apakah Anda yakin ingin menghapus tiket ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tickets/${ticketId}?type=${type}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Tiket berhasil dihapus",
        });
        refreshTickets(); // Refresh data
      } else {
        throw new Error('Failed to delete ticket');
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast({
        title: "Error",
        description: "Gagal menghapus tiket",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalEventTickets = tickets.eventTickets.length;
  const totalDestinationTickets = tickets.destinationTickets.length;
  const totalTickets = totalEventTickets + totalDestinationTickets;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Tiket</h1>
          <p className="text-muted-foreground">
            Kelola tiket untuk event dan destinasi
          </p>
        </div>
        <Link href="/dashboard/ticket/create">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Buat Tiket Baru
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tiket</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              Semua tiket yang tersedia
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiket Event</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEventTickets}</div>
            <p className="text-xs text-muted-foreground">
              Tiket untuk event
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiket Destinasi</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDestinationTickets}</div>
            <p className="text-xs text-muted-foreground">
              Tiket untuk destinasi
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Event Tickets Section */}
      {tickets.eventTickets.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Tiket Event</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.eventTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{ticket.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {ticket.event.title}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">Event</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Harga</p>
                      <p className="font-medium">{formatCurrency(ticket.price)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stok</p>
                      <p className="font-medium">{ticket.stock}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{ticket._count.orders} pesanan</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Dibuat: {formatDate(ticket.createdAt)}
                  </p>

                  <Separator />

                  <div className="flex gap-2">
                    <Link 
                      href={`/dashboard/ticket/edit/${ticket.id}?type=event`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(ticket.id, 'event')}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Destination Tickets Section */}
      {tickets.destinationTickets.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Tiket Destinasi</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.destinationTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{ticket.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {ticket.destination.name}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Destinasi</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Harga</p>
                      <p className="font-medium">{formatCurrency(ticket.price)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stok</p>
                      <p className="font-medium">{ticket.stock}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{ticket._count.orders} pesanan</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Dibuat: {formatDate(ticket.createdAt)}
                  </p>

                  <Separator />

                  <div className="flex gap-2">
                    <Link 
                      href={`/dashboard/ticket/edit/${ticket.id}?type=destination`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(ticket.id, 'destination')}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalTickets === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum ada tiket</h3>
            <p className="text-muted-foreground text-center mb-6">
              Belum ada tiket yang dibuat. Mulai dengan membuat tiket pertama Anda.
            </p>
            <Link href="/dashboard/ticket/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat Tiket Pertama
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}