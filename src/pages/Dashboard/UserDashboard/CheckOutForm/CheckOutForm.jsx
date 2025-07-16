import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const CheckoutForm = ({ offer }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    const exchangeRate = 110;
    const usdAmount = parseFloat((offer.offerAmount / exchangeRate).toFixed(2));

    // ✅ Step 0: যদি আগেই bought হয়, তাহলে পেমেন্ট অপশন না দেখিয়ে transactionId দেখাও
    if (offer.status === "bought") {
        return (
            <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl space-y-4">
                <h2 className="text-xl font-semibold text-center text-green-600">✅ Already Paid</h2>
                <p className="text-center text-gray-600">
                    <strong>৳{offer.offerAmount}</strong> has been paid.
                </p>
                <p className="text-center">
                    <span className="font-medium">Transaction ID:</span>{" "}
                    <span className="text-blue-600">{offer.transactionId}</span>
                </p>
            </div>
        );
    }

    // Step 1: Create Payment Intent
    useEffect(() => {
        if (offer.status === "bought") return; // ✅ safe conditional check inside
        if (usdAmount && usdAmount > 0) {
            axiosSecure
                .post("/create-payment-intent", { amount: usdAmount })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((err) => {
                    console.error("❌ Error creating payment intent:", err);
                });
        }
    }, [usdAmount, axiosSecure, offer.status]);

    // Step 2: Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCardError("");
        setProcessing(true);

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) {
            setCardError("Please provide card information.");
            setProcessing(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setCardError(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: paymentMethod.id }
        );

        if (confirmError) {
            setCardError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // Step 3: Save to DB
            const paymentData = {
                offerId: offer._id,
                propertyId: offer.propertyId,
                buyerEmail: user.email,
                amount: offer.offerAmount,
                usdAmount,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: "bought",
            };

            const res = await axiosSecure.post("/payments", paymentData);
            if (res.data.insertedId) {
                // Also update offer status
                await axiosSecure.patch(`/payments/mark-paid/${offer._id}`, {
                    transactionId: paymentIntent.id,
                });

                Swal.fire("✅ Payment Successful!", `Transaction ID: ${paymentIntent.id}`, "success")
                    .then(() => {
                        // Reload page or optionally call refetch
                        window.location.reload(); // or use navigate/refetch
                    });
            }
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-xl rounded-xl space-y-5">
            <h2 className="text-2xl font-semibold text-center">💳 Secure Payment</h2>
            <p className="text-center text-sm text-gray-500">
                Offer Amount: <strong>৳{offer.offerAmount}</strong> ≈ <strong>${usdAmount} USD</strong>
            </p>

            <div className="bg-gray-100 p-4 rounded-md">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#333",
                                fontFamily: "monospace",
                                "::placeholder": { color: "#888" },
                            },
                            invalid: { color: "#e63946" },
                        },
                    }}
                />
            </div>

            {cardError && <p className="text-red-500 text-sm">{cardError}</p>}

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary w-full"
            >
                {processing ? "Processing..." : `Pay $${usdAmount} (USD)`}
            </button>
        </form>
    );
};

export default CheckoutForm;
