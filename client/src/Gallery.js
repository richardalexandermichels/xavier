import React from "react";

class Gallery extends React.Component {
  renderImage(imageData,key) {
    return (
      <div key={key} className="image-content-pair">
        <div className="text-content">
            <h2 className="gallery-header">
                {imageData.header}
            </h2>
            <div className="gallery-content">
                {imageData.content}
            </div>
        </div>
        <img className="gallery-image" src={imageData.url} />
      </div>
    );
  }

  render() {
    return (
      <div className="gallery">
        <div className="images">
          {this.props.imageUrls.map((imageData, key) => this.renderImage(imageData, key))}
        </div>
      </div>
    );
  }
}

export default Gallery;