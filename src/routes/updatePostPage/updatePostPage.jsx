import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./updatePostPage.scss";
import { popularCities } from "../../lib/dummydata";
import { request } from "../../helpers/apiService"; 
import { getAuthUser } from "../../helpers/apiService"; 

function UpdatePostPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authUser = getAuthUser();
    if (authUser) {
      setUser(authUser);
    }
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [erreur, setErreur] = useState(null);
  const {id} = useParams();
  const [offerRequest, setOfferRequest] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await request("GET", `/api/v1/users/getOffre/${id}`);
        setFormData(response.data);
        const offer = response.data.immobilierResponse;
        setOfferRequest(offer);
  
        if (offer.images && offer.images.length > 0) {
          const previews = offer.images.map((imageUrl, index) => ({
            file: null, 
            previewUrl: imageUrl, 
            index: index + 1,
          }));
          setImagePreviews(previews);
        }
      } catch (erreur) {
        setErreur(erreur);
      }
    };
    fetchOfferDetails();
  }, [id]);  
  if (!offerRequest) return <div>Loading...</div>;
  if(erreur) return <div>Erreur Loading offer details</div>
  if(!formData) return <div>No Offer Found</div>
  if (!offerRequest) {
    return <div className="error">Real Estate Not Found</div>;
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferRequest(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    let isValid = true;
    files.forEach(file => {
      if (!validTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Please upload JPEG, PNG, or GIF images.`);
        isValid = false;
      }
      if (file.size > maxSize) {
        alert(`File too large: ${file.name}. Must be under 5MB.`);
        isValid = false;
      }
    });
  
    if (!isValid) return;
  
    const previews = files.map((file, index) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      index: imagePreviews.length + index + 1, 
    }));
  
    if (offerRequest.images.length + files.length > 4) {
      alert('You can only upload a maximum of 4 images.');
      return;
    }
  
    setOfferRequest(prevState => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  
    setImagePreviews(prevState => [...prevState, ...previews]);
  };
  
  const handleRemoveImage = (indexToRemove) => {
    setOfferRequest(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove),
    }));
    setImagePreviews(prevState => prevState.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (imagePreviews.length !== 4) {
      alert('Please upload exactly 4 images.');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const newImages = imagePreviews.filter((img) => img.file !== null);
      const existingImages = imagePreviews.filter((img) => img.file === null).map((img) => img.previewUrl);
      console.log(newImages);
      console.log(existingImages);
  
        const imageBase64Promises = newImages.map((img) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(img.file);
        });
      });
  
      const newImagesBase64 = await Promise.all(imageBase64Promises);
  
      const allImages = [...existingImages, ...newImagesBase64];
  
      const updateRequest = {
        id: formData.id,
        immobilierRequest: {
          ...offerRequest,
          images: allImages,
        },
        userId: user.id
      };
  
      const response = await request("PUT", `/api/v1/users/updateOffre/${formData.id}`,updateRequest);

      if (response && response.data) {
       // alert('Offer updated successfully! Offer ID: ' + response.data);
        navigate(`/MyOffre/${formData.id}`);
      } else {
        throw new Error('Failed to update offer.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="updatePostPage" style={{ paddingTop: "30px" }}>
      <div className="formContainer">
        <h1>Update Post</h1><hr/>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input 
                id="title" 
                name="title" 
                type="text" 
                value={offerRequest.title}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input 
                id="price" 
                name="price" 
                type="number" 
                value={offerRequest.price}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input 
                id="address" 
                name="address" 
                type="text" 
                value={offerRequest.address}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <select 
                id="city" 
                name="city" 
                value={offerRequest.city} // Prepopulate with the current value
                onChange={handleChange}
                required
              >
                {/* Default option showing the currently selected city */}
                <option value="">-- Select a City --</option>
                {popularCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input 
                min={1} 
                id="bedroom" 
                name="bedroom" 
                type="number" 
                value={offerRequest.bedroom}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input 
                min={1} 
                id="bathroom" 
                name="bathroom" 
                type="number" 
                value={offerRequest.bathroom}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input 
                id="latitude" 
                name="latitude" 
                type="text" 
                value={offerRequest.latitude}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input 
                id="longitude" 
                name="longitude" 
                type="text" 
                value={offerRequest.longitude}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="item">
              <label htmlFor="type">Type</label>
              <select 
                name="type" 
                value={offerRequest.type}
                onChange={handleChange}
              >
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select 
                name="property" 
                value={offerRequest.property}
                onChange={handleChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select 
                name="utilities" 
                value={offerRequest.utilities}
                onChange={handleChange}
              >
                <option value="owner is responsible">Owner is responsible</option>
                <option value="tenant is responsible">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="petPolicy">Pet Policy</label>
              <select 
                name="petPolicy" 
                value={offerRequest.petPolicy}
                onChange={handleChange}
              >
                <option value="allowed">Allowed</option>
                <option value="not allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="incomePolicy">Income Policy</label>
              <input 
                id="incomePolicy" 
                name="incomePolicy" 
                type="text" 
                placeholder="Income Policy"
                value={offerRequest.incomePolicy}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input 
                min={0} 
                id="size" 
                name="size" 
                type="number" 
                value={offerRequest.size}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="item">
              <label htmlFor="schoolDistance">School Distance</label>
              <input 
                min={0} 
                id="schoolDistance" 
                name="schoolDistance" 
                type="number" 
                value={offerRequest.schoolDistance}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="busDistance">Bus Distance</label>
              <input 
                min={0} 
                id="busDistance" 
                name="busDistance" 
                type="number" 
                value={offerRequest.busDistance}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurantDistance">Restaurant Distance</label>
              <input 
                min={0} 
                id="restaurantDistance" 
                name="restaurantDistance" 
                type="number" 
                value={offerRequest.restaurantDistance}
                onChange={handleChange}
              />
            </div>
            <div className="item imageUploadItem">
              <label htmlFor="imageUpload">Property Images (Exactly 4 Required)</label>
              <input 
                id="imageUpload" 
                name="images" 
                type="file" 
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageUpload}
                multiple // Allow multiple file selection
              />
              {imagePreviews.length > 0 && (
                <div className="imagePreviewContainer">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="imagePreview" style={{ position: 'relative' }}>
                        {/* Close Button */}
                        <button
                          type="button"
                          className="closeIconButton"
                          onClick={() => handleRemoveImage(index)}
                        >
                          ✕ {/* X icon */}
                        </button>
                        {/* Image Preview */}
                        <img 
                        src={preview.previewUrl} 
                        alt={`Property Image ${preview.index}`} 
                        style={{ maxWidth: '150px', maxHeight: '150px', margin: '5px' }} 
                        />
                    </div>
                    ))}
                </div>
              )}
              {imagePreviews.length > 0 && (
                <div className="imageCount">
                  {imagePreviews.length} / 4 images selected
                </div>
              )}
            </div>
            <div className="itemDesc descriptionItem">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={offerRequest.description}
                onChange={handleChange}
                rows="6" // Increases the height of the textarea
                maxLength="2000" // Limits the maximum number of characters
                required
              />
              <div className="characterCount">
                {offerRequest.description.length} / 2000 characters
              </div>
            </div>
            <button
              type="submit" className="sendButton" disabled={isSubmitting}
              style={{
                marginLeft: "90%",
                backgroundColor: "#fece51",
                color: "black",
                fontSize: "20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                maxWidth: "200px",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f0b600";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#fece51";
                e.target.style.transform = "scale(1)";
              }}
              onFocus={(e) => {
                e.target.style.outline = "none";
                e.target.style.boxShadow = "0 0 5px rgba(254, 206, 81, 0.7)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "none";
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePostPage;