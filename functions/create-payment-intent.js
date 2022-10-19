const stripe = require("stripe")(
  "sk_test_51Ls1y5SAvQEBQr8P877JHnI62rcsdhGuoPrajhCOjnQNASaj013O0AbT2IJHkqTQLHiTS4ueFOAzk0rqLINIlZJO00B1L9rvDr"
);
exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clintSecret: paymentIntent.clint_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create payment intent ",
  };
};
