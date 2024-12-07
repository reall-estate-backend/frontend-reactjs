  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import "./newPostPage.scss";
  import OffreService from '../../services/OffreService';
  import { popularCities } from "../../lib/dummydata";

  function NewPostPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
      title: '',
      price: '',
      images: [], // img to images array
      address: '',
      city: '',
      bedroom: 1,
      bathroom: 1,
      latitude: '',
      longitude: '',
      description: '',
      type: 'rent',
      property: 'apartment',
      utilities: 'owner is responsible',
      petPolicy: 'allowed',
      incomePolicy: '',
      size: '',
      schoolDistance: '',
      busDistance: '',
      restaurantDistance: '',
      userId: '' // You'll need to replace this with actual user ID
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);

      // Validate file types and sizes
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      const validFiles = files.filter(file => {
        if (!validTypes.includes(file.type)) {
          alert('Please upload valid images (JPEG, PNG, or GIF)');
          return false;
        }
        if (file.size > maxSize) {
          alert('Image size should be less than 5MB');
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        alert('No valid images selected');
        return;
      }

      // Check if the number of images is still less than 4
      if (formData.images.length + validFiles.length > 4) {
        alert('You can only upload a maximum of 4 images.');
        return;
      }

      // Add each image to the state with an index
      const previews = validFiles.map((file, index) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        index: formData.images.length + index + 1, // Image number (1, 2, 3, 4)
      }));

      // Update the formData and imagePreviews
      setFormData(prevState => ({
        ...prevState,
        images: [...prevState.images, ...validFiles], // Add images incrementally
      }));

      setImagePreviews(prevState => [
        ...prevState, ...previews // Update image previews with file preview URLs and indices
      ]);
    };
    const handleRemoveImage = (index) => {
      // Remove the selected image based on index
      setFormData((prevState) => {
        const updatedImages = [...prevState.images];
        updatedImages.splice(index, 1); // Remove the image at the selected index
        return {
          ...prevState,
          images: updatedImages,
        };
      });
    
      setImagePreviews((prevState) => {
        const updatedPreviews = [...prevState];
        updatedPreviews.splice(index, 1); // Remove the preview at the selected index
        return updatedPreviews;
      });
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      // Ensure exactly 4 images are uploaded
      if (formData.images.length !== 4) {
        alert('Please upload exactly 4 images');
        return;
      }
      setIsSubmitting(true);

      try {
        // Convert images to base64
        const imageBase64Promises = formData.images.map(img => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(img);
          });
        });

        const imagesBase64 = await Promise.all(imageBase64Promises);

        // Prepare the offer request object matching your backend structure
        const offerRequest = {
          userId: "67477a5a7e8cf83850b79b91", // Replace with actual user ID
          immobilierRequest: {
            title: formData.title,
            bedroom: parseInt(formData.bedroom),
            images: imagesBase64, // Send base64 encoded images
            bathroom: parseInt(formData.bathroom),
            price: parseFloat(formData.price),
            address: formData.address,
            city: formData.city,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            description: formData.description,
            type: formData.type,
            property: formData.property,
            utilities: formData.utilities,
            petPolicy: formData.petPolicy,
            incomePolicy: formData.incomePolicy,
            size: parseFloat(formData.size),
            schoolDistance: parseFloat(formData.schoolDistance),
            busDistance: parseFloat(formData.busDistance),
            restaurantDistance: parseFloat(formData.restaurantDistance)
          }
        };

        // Send POST request to backend
        const response = await OffreService.saveOffer(offerRequest);

        if (response && response.data) {
          alert('Offer created successfully! Offer ID: ' + response.data);
          navigate('/Myspace');
        } else {
          throw new Error('Failed to create offer.');
        }
        
      } catch (error) {
        console.error('Error creating offer:', error);
        alert('Failed to create offer. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="newPostPage">
        <div className="formContainer">
          <h1>Add New Post</h1>
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="title">Title</label>
                <input 
                  id="title" 
                  name="title" 
                  type="text" 
                  value={formData.title}
                  onChange={handleChange}
                  required 
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
                  required 
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
                          alt={`Property Image ${index + 1}`}
                          style={{ maxWidth: '150px', maxHeight: '150px', margin: '5px' }}
                        />
                        <div>Image {index + 1}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="imageCount">{imagePreviews.length} / 4 images selected</div>
              </div>
              <div className="item">
                <label htmlFor="price">Price</label>
                <input 
                  id="price" 
                  name="price" 
                  type="number" 
                  value={formData.price}
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
                  value={formData.address}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <select 
                  id="city" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  required
                >
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
                  value={formData.bedroom}
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
                  value={formData.bathroom}
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
                  value={formData.latitude}
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
                  value={formData.longitude}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="item descriptionItem">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6" // Increases the height of the textarea
                  maxLength="2000" // Limits the maximum number of characters
                  required
                />
                <div className="characterCount">
                  {formData.description.length} / 2000 characters
                </div>
              </div>
              <div className="item">
                <label htmlFor="type">Type</label>
                <select 
                  name="type" 
                  value={formData.type}
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
                  value={formData.property}
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
                  value={formData.utilities}
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
                  value={formData.petPolicy}
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
                  value={formData.incomePolicy}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="item">
                <label htmlFor="size">Total Size (sqft)</label>
                <input 
                  min={0} 
                  id="size" 
                  name="size" 
                  type="number" 
                  value={formData.size}
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
                  value={formData.schoolDistance}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="item">
                <label htmlFor="busDistance">Bus Distance</label>
                <input 
                  min={0} 
                  id="busDistance" 
                  name="busDistance" 
                  type="number" 
                  value={formData.busDistance}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="item">
                <label htmlFor="restaurantDistance">Restaurant Distance</label>
                <input 
                  min={0} 
                  id="restaurantDistance" 
                  name="restaurantDistance" 
                  type="number" 
                  value={formData.restaurantDistance}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="sendButton" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
        <div className="sideContainer"></div>
      </div>
    );
  }

  export default NewPostPage;