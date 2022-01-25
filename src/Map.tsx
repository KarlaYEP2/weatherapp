import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import App from './App';
import React, {useState} from "react"


function Map() {
    return(
        <MapContainer center={[59.505, 26]} zoom={13} scrollWheelZoom={true} id={'map'}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[59.505, 26]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;