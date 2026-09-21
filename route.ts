import { db } from '@/lib/db'; import Stripe from 'stripe'; import { NextResponse } from 'next/server';
export async function POST(req:Request){
 const f=await req.formData(); const inventoryId=String(f.get('inventoryId')); const paymentMethod=String(f.get('paymentMethod')) as 'CARD'|'WIRE';
 const buyerName=String(f.get('buyerName')); const buyerEmail=String(f.get('buyerEmail')); const buyerPhone=String(f.get('buyerPhone')||'');
 const item=await db.inventory.findUnique({where:{id:inventoryId}}); if(!item||item.status!=='AVAILABLE') return new NextResponse('Inventory unavailable',{status:409});
 const order=await db.order.create({data:{inventoryId,buyerName,buyerEmail,buyerPhone,paymentMethod,amountCents:item.priceCents,currency:item.currency}});
 if(paymentMethod==='WIRE') return NextResponse.redirect(new URL('/?order='+order.id+'&wire=1',req.url));
 const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);
 const session=await stripe.checkout.sessions.create({mode:'payment',customer_email:buyerEmail,line_items:[{price_data:{currency:item.currency.toLowerCase(),product_data:{name:item.title},unit_amount:item.priceCents},quantity:1}],success_url:`${process.env.NEXT_PUBLIC_SITE_URL}/?success=1&order=${order.id}`,cancel_url:`${process.env.NEXT_PUBLIC_SITE_URL}/inventory/${item.id}`,metadata:{orderId:order.id}});
 await db.order.update({where:{id:order.id},data:{stripeSession:session.id}});
 return NextResponse.redirect(session.url!,303);
}