import "../css/nearby.css"

const Nearby = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY
  return (
    <div className="nearby-container">
      Insert Map Here

      <iframe
        title="nearby-location"
        width="600"
        height="450"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={"https://www.google.com/maps/embed/v1/place?key=" + apiKey + "&q=Space+Needle,Seattle+WA"}>
      </iframe>
    </div>
  )
}

export {Nearby}