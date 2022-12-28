import axios from "axios";
import { setAlert } from "./alert";

export const uploadFile = (formData,multiple) =>async dispatch=> {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      const res = await axios.post('/api/upload', formData, config);
      return multiple ? res.data.file : res.data.file[0];
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      }
    }
  }

 export const fileDownload = (urlFIle, fileName) => {
    fetch(urlFIle, {
      method: 'GET',
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          fileName + "." + urlFIle.slice(urlFIle.length - 3),
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }