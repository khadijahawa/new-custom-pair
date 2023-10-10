import Stripe from "stripe";


export default async function handler(req, res) {
    const { items, cleaningRequest } = req.body; // Include the items in the cart and cleaning request
  
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe requires amount in cents
        },
        quantity: item.quantity,
      })),
      // Include cleaning request as a line item if present
      // You may need to adjust this depending on your data structure
      ...(cleaningRequest && {
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Cleaning Request",
              },
              unit_amount: cleaningRequest.price * 100,
            },
            quantity: 1, // You can adjust this as needed
          },
        ],
      }),
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`, // Redirect URL after successful payment
      cancel_url: `${YOUR_DOMAIN}/cancel`, // Redirect URL if user cancels payment
    });
  
    res.status(200).json({ sessionId: session.id });
  }