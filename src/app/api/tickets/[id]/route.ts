import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'event' or 'destination'

    let ticket;

    if (type === 'destination') {
      ticket = await prisma.destinationTicket.findUnique({
        where: { id },
        include: {
          destination: {
            select: {
              id: true,
              name: true,
            }
          },
          _count: {
            select: {
              orders: true
            }
          }
        }
      });
    } else {
      // Default to event ticket
      ticket = await prisma.ticket.findUnique({
        where: { id },
        include: {
          event: {
            select: {
              id: true,
              title: true,
            }
          },
          _count: {
            select: {
              orders: true
            }
          }
        }
      });
    }

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ticket);

  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    const body = await request.json();
    const { name, price, stock, type } = body;

    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Name, price, and stock are required' },
        { status: 400 }
      );
    }

    let updatedTicket;

    if (type === 'destination') {
      updatedTicket = await prisma.destinationTicket.update({
        where: { id },
        data: {
          name,
          price: parseFloat(price),
          stock: parseInt(stock)
        },
        include: {
          destination: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      });
    } else {
      updatedTicket = await prisma.ticket.update({
        where: { id },
        data: {
          name,
          price: parseFloat(price),
          stock: parseInt(stock)
        },
        include: {
          event: {
            select: {
              id: true,
              title: true,
            }
          }
        }
      });
    }

    return NextResponse.json(updatedTicket);

  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await Promise.resolve(params);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'event' or 'destination'

    if (type === 'destination') {
      await prisma.destinationTicket.delete({
        where: { id }
      });
    } else {
      await prisma.ticket.delete({
        where: { id }
      });
    }

    return NextResponse.json({ message: 'Ticket deleted successfully' });

  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Failed to delete ticket' },
      { status: 500 }
    );
  }
}
