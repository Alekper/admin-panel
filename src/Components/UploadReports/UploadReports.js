import React from "react";
import './UploadReports.css'

export default function UploadReports() {


    return (
          <form>
        <div className="upload-container">
          <label htmlFor="upload-inp" className="upload-label">Select reports</label>
            <input type="file" id="upload-inp" multiple/>
            <button className="upload-btn" type="submit">Upload</button>
        </div>
          </form>
    )
}