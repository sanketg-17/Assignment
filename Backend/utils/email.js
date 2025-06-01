import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "b0f507a1b29bbf24725aad3c3716760d",
  },
});

const templates = {
  approved: ({ orderId, product, user }) => ({
    subject: `Order #${orderId} Confirmation`,
    html: `
      <h1>Thank you for your purchase!</h1>
      <p>Your order #${orderId} has been approved.</p>
      <h3>Product Info</h3>
      <p>Title: ${product.title}</p>
      <p>Variant: ${product.selectedVariant}</p>
      <p>Size: ${product.selectedSize}</p>
      <p>Quantity: ${product.quantity}</p>
      <h3>Customer Info</h3>
      <p>Name: ${user.fullName}</p>
      <p>Email: ${user.email}</p>
      <p>We appreciate your business!</p>
    `,
  }),
  declined: ({ orderId, user }) => ({
    subject: `Order #${orderId} Payment Failed`,
    html: `
      <h1>Transaction Failed</h1>
      <p>Sorry, your order #${orderId} could not be processed.</p>
      <p>Please retry your payment or contact support at support@example.com.</p>
      <h3>Customer Info</h3>
      <p>Name: ${user.fullName}</p>
      <p>Email: ${user.email}</p>
    `,
  }),
};

export async function sendOrderEmail(status, orderId, product, user) {
  const { subject, html } = templates[status]({ orderId, product, user });

  const mailOptions = {
    from: '"Shop Name" <no-reply@shop.com>', 
    to: user.email, 
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
