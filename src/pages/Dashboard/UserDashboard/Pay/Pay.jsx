import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import CheckoutForm from "../CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log("Stripe key:", import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Pay = () => {
  const { id } = useParams(); // dynamic id from URL
  const axiosSecure = useAxiosSecure();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/offers/${id}`)
      .then(res => {
        setOffer(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch offer", err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  if (loading) return <p className="text-center">⏳ Loading...</p>;
  if (!offer) return <p className="text-center text-red-500">❌ Offer not found</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Make Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm offer={offer} /> 
      </Elements>
    </div>
  );
};

export default Pay;
