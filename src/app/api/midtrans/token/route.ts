/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from 'next/server'

const midtransClient = require('midtrans-client')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate environment variables
    const serverKey = process.env.MIDTRANS_SERVER_KEY
    if (!serverKey || serverKey === 'SB-Mid-server-your-server-key') {
      return NextResponse.json(
        { error: 'Midtrans server key not configured' },
        { status: 500 }
      )
    }

    // Create Snap API instance
    const snap = new midtransClient.Snap({
      isProduction: false, // Set to true for production
      serverKey: serverKey,
    })

    const parameter = {
      transaction_details: body.transaction_details,
      customer_details: body.customer_details,
      item_details: body.item_details,
      notes: body.notes,
      credit_card: {
        secure: true
      },
      // Enable common payment methods
      enabled_payments: [
        'credit_card',
        'bca_va',
        'bni_va',
        'bri_va',
        'echannel',
        'permata_va',
        'other_va',
        'gopay',
        'shopeepay',
        'qris'
      ]
    }

    console.log('Creating transaction with parameter:', JSON.stringify(parameter, null, 2))

    const transaction = await snap.createTransaction(parameter)

    const url = "http://localhost:3000/success"

    return NextResponse.json({
      token: transaction.token,
      redirect_url: url
    })
  } catch (error: any) {
    console.error('Error creating transaction:', error)
    
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: 'Failed to create transaction',
        details: error.message || 'Unknown error',
        statusCode: error.httpStatusCode || 500
      },
      { status: 500 }
    )
  }
}