import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";


const MakeAnOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [offerAmount, setOfferAmount] = useState("");

  useEffect(() => {
    axiosSecure.get(`/properties/${id}`)
      .then(res => {
        setProperty(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch property", err);
        setIsLoading(false);
      });
  }, [id, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role !== "user") {
      Swal.fire("Access Denied", "Only users can make an offer.", "error");
      return;
    }

    if (!property) {
      Swal.fire("Error", "Property data not found", "error");
      return;
    }

    const offer = parseFloat(offerAmount);
    if (isNaN(offer)) {
      Swal.fire("Invalid input", "Please enter a valid offer amount", "error");
      return;
    }
    if (offer < property.minPrice || offer > property.maxPrice) {
      Swal.fire("Invalid Offer", `Offer must be between ৳${property.minPrice} - ৳${property.maxPrice}`, "error");
      return;
    }

    const offerData = {
      propertyId: property._id.toString(),
      title: property.title,
      location: property.location,
       agentEmail: property.agentEmail,
      agentName: property.agentName,
      offerAmount: offer,
       image: property.image,
      buyerEmail: user.email,
      buyerName: user.displayName,
      buyingDate: new Date(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/offers", offerData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Offer submitted successfully!", "success");
        navigate("/dashboard/user/property-bought");
      }
    } catch (error) {
      console.error("Offer submission failed", error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!property) return <p className="text-center text-red-500">Property not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Make an Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Property Title</label>
          <input type="text" value={property.title} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label>Property Location</label>
          <input type="text" value={property.location} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label>Agent Name</label>
          <input type="text" value={property.agentName} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label>Offer Amount (৳{property.minPrice} - ৳{property.maxPrice})</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            required
            className="input input-bordered w-full"
            min={property.minPrice}
            max={property.maxPrice}
            step="1000"
          />
        </div>

        <div>
          <label>Buyer Email</label>
          <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label>Buyer Name</label>
          <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
        </div>

        <div>
          <label>Buying Date</label>
          <input type="text" value={moment().format("YYYY-MM-DD")} readOnly className="input input-bordered w-full" />
        </div>

        <button type="submit" className="btn btn-primary w-full my-10 ">Submit Offer</button>
      </form>
    </div>
  );
};

export default MakeAnOffer;
