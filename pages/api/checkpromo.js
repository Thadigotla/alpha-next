import stripe from 'stripe';

const checkpromo = async (req, res) => {

    console.log(req.body)

  const { coupon_name } = req.body;

  const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);


  try {
    const coupons = await stripeInstance.coupons.list();
    const couponExists = coupons.data.find((coupon) => coupon.name === coupon_name);
    if (couponExists) {
      res.status(200).json({
        valid: true,
        id: couponExists.id,
        percent_off: couponExists.percent_off,
      });
    } else {
      res.status(400).json({
        valid: false,
        id: null,
        percent_off: null,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default checkpromo;
