import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PropertyBought = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: offers = [], refetch } = useQuery({
        queryKey: ['user-offers', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers?email=${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (user?.email) {
            refetch();
        }
    }, [user?.email, refetch]);



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {offers.map(offer => (
                <div key={offer._id} className="border rounded-xl shadow p-4 space-y-2">
                    <img src={offer.propertyImage} alt="Property" className="rounded w-full h-48 object-cover" />
                    <h3 className="text-xl font-semibold">{offer.propertyTitle}</h3>
                    <p><strong>Location:</strong> {offer.propertyLocation}</p>
                    <p><strong>Agent:</strong> {offer.agentName}</p>
                    <p><strong>Offered Amount:</strong> ${offer.offeredAmount}</p>
                    <p><strong>Status:</strong> <span className={`font-bold ${offer.status === 'accepted' ? 'text-green-600' : offer.status === 'bought' ? 'text-blue-600' : 'text-orange-500'}`}>{offer.status}</span></p>

                    {offer.status === "accepted" && (
                        <Link to={`/payment/${offer._id}`}>
                            <button className="btn btn-primary w-full">Pay</button>
                        </Link>
                    )}

                    {offer.status === "bought" && (
                        <p className="text-sm text-gray-600">Transaction ID: <span className="font-mono">{offer.transactionId}</span></p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PropertyBought;
