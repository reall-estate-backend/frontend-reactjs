import { Marker } from 'react-leaflet';
import L from 'leaflet';



function Pin({ item }) {

  const { immobilierResponse } = item;
  const { latitude, longitude } = immobilierResponse;



  return (
    <Marker position={[latitude, longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.img} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>

    </Marker>
  );
}


export default Pin;
