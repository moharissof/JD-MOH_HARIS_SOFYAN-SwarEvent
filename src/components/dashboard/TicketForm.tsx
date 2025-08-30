'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
}

interface Destination {
  id: string;
  name: string;
}

interface TicketData {
  id?: string;
  name: string;
  price: number;
  stock: number;
  eventId?: string;
  destinationId?: string;
  type?: 'event' | 'destination';
}

interface TicketFormProps {
  initialData?: TicketData;
  ticketId?: string;
  mode?: 'create' | 'edit';
}

export default function TicketForm({ initialData, ticketId, mode = 'create' }: TicketFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  
  const [formData, setFormData] = useState<TicketData>({
    name: initialData?.name || '',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    eventId: initialData?.eventId || '',
    destinationId: initialData?.destinationId || '',
    type: initialData?.type || 'event',
  });

  // Fetch events and destinations for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, destinationsRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/destinations')
        ]);

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData);
        }

        if (destinationsRes.ok) {
          const destinationsData = await destinationsRes.json();
          setDestinations(destinationsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTypeChange = (type: 'event' | 'destination') => {
    setFormData(prev => ({
      ...prev,
      type,
      eventId: type === 'event' ? prev.eventId : '',
      destinationId: type === 'destination' ? prev.destinationId : ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        toast({
          title: "Error",
          description: "Nama tiket harus diisi",
          variant: "destructive",
        });
        return;
      }

      if (formData.price < 0) {
        toast({
          title: "Error",
          description: "Harga tidak boleh negatif",
          variant: "destructive",
        });
        return;
      }

      if (formData.stock < 0) {
        toast({
          title: "Error",
          description: "Stok tidak boleh negatif",
          variant: "destructive",
        });
        return;
      }

      if (formData.type === 'event' && !formData.eventId) {
        toast({
          title: "Error",
          description: "Event harus dipilih untuk tiket event",
          variant: "destructive",
        });
        return;
      }

      if (formData.type === 'destination' && !formData.destinationId) {
        toast({
          title: "Error",
          description: "Destinasi harus dipilih untuk tiket destinasi",
          variant: "destructive",
        });
        return;
      }

      const submitData = {
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        ...(formData.type === 'event' 
          ? { eventId: formData.eventId }
          : { destinationId: formData.destinationId }
        ),
        ...(mode === 'edit' && { type: formData.type })
      };

      let response;
      if (mode === 'edit' && ticketId) {
        response = await fetch(`/api/tickets/${ticketId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        });
      } else {
        response = await fetch('/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save ticket');
      }

      toast({
        title: "Success",
        description: `Tiket berhasil ${mode === 'edit' ? 'diperbarui' : 'dibuat'}`,
      });

      router.push('/dashboard/ticket');
      router.refresh();

    } catch (error) {
      console.error('Error saving ticket:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menyimpan tiket",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === 'edit' ? 'Edit Tiket' : 'Buat Tiket Baru'}
        </h1>
        <p className="text-muted-foreground">
          {mode === 'edit' 
            ? 'Perbarui informasi tiket' 
            : 'Buat tiket baru untuk event atau destinasi'
          }
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{mode === 'edit' ? 'Edit Tiket' : 'Informasi Tiket'}</CardTitle>
          <CardDescription>
            Masukkan detail tiket yang akan {mode === 'edit' ? 'diperbarui' : 'dibuat'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Ticket Type Selection */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <Label htmlFor="type" className="text-base font-medium">
                  Tipe Tiket *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleTypeChange(value as 'event' | 'destination')}
                  disabled={mode === 'edit'}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Pilih tipe tiket" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Tiket Event</SelectItem>
                    <SelectItem value="destination">Tiket Destinasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Event/Destination Selection */}
            {formData.type === 'event' ? (
              <div className="space-y-3">
                <Label htmlFor="eventId" className="text-base font-medium">
                  Pilih Event *
                </Label>
                <Select
                  value={formData.eventId}
                  onValueChange={(value) => handleInputChange('eventId', value)}
                  disabled={mode === 'edit'}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Pilih event" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-3">
                <Label htmlFor="destinationId" className="text-base font-medium">
                  Pilih Destinasi *
                </Label>
                <Select
                  value={formData.destinationId}
                  onValueChange={(value) => handleInputChange('destinationId', value)}
                  disabled={mode === 'edit'}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Pilih destinasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination.id} value={destination.id}>
                        {destination.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Separator />

            {/* Ticket Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-base font-medium">
                  Nama Tiket *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Contoh: VIP, Reguler, Anak-anak"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="price" className="text-base font-medium">
                  Harga (Rp) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="50000"
                  className="h-11"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="stock" className="text-base font-medium">
                  Stok Tersedia *
                </Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                  placeholder="100"
                  className="h-11"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/ticket')}
                className="order-2 sm:order-1 h-11"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="order-1 sm:order-2 h-11 bg-primary hover:bg-primary/90"
              >
                {isLoading 
                  ? (mode === 'edit' ? 'Menyimpan...' : 'Membuat...') 
                  : (mode === 'edit' ? 'Simpan Perubahan' : 'Buat Tiket')
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
