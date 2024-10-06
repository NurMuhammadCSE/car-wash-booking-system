// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "75vh",
// };

// const center = {
//   lat: 23.8041,
//   lng: 90.4152,
// };

// const Location = () => {
//   return (
//     <div>
//       <h1 style={headingStyle}>Welcome to the Car Washing Booking System</h1>
//       <LoadScript googleMapsApiKey="AIzaSyBAkRc51qa34Rawl1ebtSjyL2rDk_r4E28">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={8}
//           options={{ mapId: "1ebc3ed57e00574e" }}
//         ></GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// const headingStyle = {
//   fontFamily: '"Press Start 2P", cursive',
//   textAlign: "center" as const,
//   fontSize: "2rem",
//   padding: "0 3rem",
//   color: "#ffffff",
//   backgroundColor: "#30415A",
// };

// export default Location;

//! Second Location
import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const locations = [
  { lat: 23.8041, lng: 90.4152, label: "Location 1 - Dhaka" },
  // { lat: 40.712776, lng: -74.005974, label: "Location 1 - New York" },
  // { lat: 34.052235, lng: -118.243683, label: "Location 2 - Los Angeles" },
  // { lat: 41.878113, lng: -87.629799, label: "Location 3 - Chicago" },
];

const containerStyle = {
  width: "100%",
  height: "500px",
};

// const center = {
//   lat: 37.0902, // Centered on the USA for example
//   lng: -95.7129,
// };

const center = {
  lat: 23.8041,
  lng: 90.4152,
};

const ServiceAreaMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBAkRc51qa34Rawl1ebtSjyL2rDk_r4E28", // Replace with your API Key
  });

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Service Area Map
        </h2>
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            options={{ mapId: "1ebc3ed57e00574e" }}
          >
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                label={location.label}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;



//! Not Dynamic

// import React from 'react';

// const ServiceAreaMap: React.FC = () => {
//   return (
//     <section className="py-12 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Section Heading */}
//         <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Find Us in Your Area
//         </h2>

//         {/* Map Description */}
//         <p className="text-center text-lg text-gray-600 mb-12">
//           We offer car wash services at multiple locations! Check out our service areas and find the one closest to you.
//         </p>

//         {/* Google Map Embed */}
//         <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450958!2d144.95373531550494!3d-37.8162796797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ec8b5b8b9e0!2sCar%20Wash!5e0!3m2!1sen!2sus!4v1631003215552!5m2!1sen!2sus"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen={true}
//             loading="lazy"
//           ></iframe>

//           {/* Marker or Overlay for Branding */}
//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//             {/* Optional branding */}
//           </div>
//         </div>

//         {/* Service Area Highlights (Optional) */}
//         <div className="mt-8 text-center">
//           <h3 className="text-2xl font-semibold text-gray-700">Available Locations:</h3>
//           <ul className="mt-4 space-y-2">
//             <li className="text-gray-600">- Downtown Area</li>
//             <li className="text-gray-600">- Suburbs (North & South)</li>
//             <li className="text-gray-600">- Mobile Car Wash (Within 30 km)</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceAreaMap;
