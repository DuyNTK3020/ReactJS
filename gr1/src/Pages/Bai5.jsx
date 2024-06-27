import React, { useEffect, useRef, useState } from "react";
import "./Bai5.scss";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import all_icons from "../Assets/Icons/all_icons";

export const Bai5 = () => {
  const mapRef = useRef(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [activeInput, setActiveInput] = useState(null);

  useEffect(() => {
    if (mapRef.current) {
      return;
    }

    const map = L.map("map").setView([21.006, 105.843], 15);
    mapRef.current = map;

    const mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "Leaflet &copy; " + mapLink + ", contribution",
      maxZoom: 18,
    }).addTo(map);

    map.on("click", function (e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      if (activeInput === "start") {
        setStartPoint([lat, lng]);
        fetchAddress(lat, lng, setStartAddress);
      } else if (activeInput === "end") {
        setEndPoint([lat, lng]);
        fetchAddress(lat, lng, setEndAddress);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [activeInput]);

  const fetchAddress = async (lat, lng, setAddress) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Unknown location");
    }
  };

  const handleFindRoute = () => {
    if (!startPoint || !endPoint) return;

    const map = mapRef.current;
    const startIcon = L.icon({
      iconUrl: all_icons.start,
      iconSize: [30, 30],
    });

    const endIcon = L.icon({
      iconUrl: all_icons.end,
      iconSize: [30, 30],
    });

    L.Routing.control({
      waypoints: [L.latLng(startPoint), L.latLng(endPoint)],
      createMarker: function (i, waypoint, n) {
        const icon = i === 0 ? startIcon : endIcon;
        return L.marker(waypoint.latLng, { icon: icon });
      },
    }).addTo(map);
  };

  return (
    <div className="Bai5">
      <h1>Bài 5: Nhúng và tương tác với bản đồ OpenStreetMap</h1>
      <div className="container">
        <div className="container-left">
          <form action="" className="form">
            <div className="form-group">
              <label htmlFor="startPoint">Điểm xuất phát</label>
              <p><strong>Địa chỉ:</strong> {startAddress}</p>
              <input
                type="text"
                id="startPoint"
                name="startPoint"
                value={startPoint}
                readOnly
                onClick={() => setActiveInput("start")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="endPoint">Điểm đến</label>
              <p><strong>Địa chỉ:</strong> {endAddress}</p>
              <input
                type="text"
                id="endPoint"
                name="endPoint"
                value={endPoint}
                readOnly
                onClick={() => setActiveInput("end")}
              />
            </div>
          </form>
          <button className="btn" onClick={handleFindRoute}>
            Tìm đường
          </button>
        </div>
        <div className="container-right">
          <div id="map"></div>
        </div>
      </div>
    </div>
  );
};
