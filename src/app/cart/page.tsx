'use client'
import React, { useState, useEffect } from 'react';
import { S3 } from 'aws-sdk';

export default function Cart(){
 const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
   const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [buckets, setBuckets] = useState([]);
  
  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY               
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY                 
  const ENDPOINT  =  process.env.NEXT_PUBLIC_LIARA_ENDPOINT
  const BUCKET    = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME
  


//fetching buckets uses listbuckets
  const fetchBuckets = async () => {
    //creating an S3 instance
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
    //on calling the S3 bucket to fetch it,the s3 instance uses listBuckets method and the result gets saved inside
    // Buckets state using setBuckets and in case of error the error will be consoled
    try {
      const response = await s3.listBuckets().promise();
      setBuckets(response.Buckets);
    } catch (error) {
      console.error('Error fetching buckets: ', error);
    }
  };

  const fetchAllFiles = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
//it uses listobjectv2 that takes the bucket evoriment variable and sets it to allfiles state
    try {
      const response = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
      setAllFiles(response.Contents);
    } catch (error) {
      console.error('Error fetching files: ', error);
    }
  };
//it runs the two functions to take in the buckets and it runs based on the change on uploadlink state
  useEffect(() => {
    fetchBuckets();
    fetchAllFiles();
  }, [uploadLink]);

//hadnle filechange puts the file into the file state and sets the states of error and uploadlink and permenantlink to null
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };
//handles upload to the s3 bucket
  const handleUpload = async () => {
    try {
      //on no file the error state asks for the file
      if (!file) {
        setError('Please select a file');
        return;
      }

      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });
//the params has the bucket env and the file name as key and the file content as body
      const params = {
        Bucket: BUCKET,
        Key: file.name,
        Body: file,
      };
//the response uses the upload method of the s3 method and takes in the prams
      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 3600,
      });

      setUploadLink(signedUrl);

      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: file.name,
        Expires: 31536000, // 1 year
      });
      setPermanentLink(permanentSignedUrl);

      // Update list of uploaded files
      setUploadedFiles((prevFiles) => [...prevFiles, response]);

      // Update list of all files
      fetchAllFiles();

      console.log('File uploaded successfully');
    } catch (error) {
      setError('Error uploading file: ' + error.message);
    }
  };

  const handleShowFiles = () => {
    console.log('List of uploaded files:', uploadedFiles);
  };

  const handleDeleteFile = async (file) => {
    try {
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });

      await s3.deleteObject({ Bucket: BUCKET, Key: file.Key }).promise();

      // Update the list of uploaded files
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((uploadedFile) => uploadedFile.Key !== file.Key)
      );

      // Update list of all files
      fetchAllFiles();

      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };
//ui has a first div with the id of upload container
  return (
    <div id="upload-container">
      <h1>Upload File to S3</h1>
{/*it puts the file into the e.target.file[0]*/ }
      <input type="file" onChange={handleFileChange} />
{/*file upload button*/ }

      <button className="m-4" onClick={handleUpload} disabled={!file}>
        Upload
      </button>
{/*if there is an uploadlink*/ }
      {uploadLink && (
        <h3 className="success-message">
          File uploaded successfully. Temporary Link:{' '}
          <a href={uploadLink} target="_blank" rel="noopener noreferrer">
            Temporary Link
          </a>
        </h3>
      )}
      
      {permanentLink && (
        <h3 className="success-message">
          Permanent Link:{' '}
          <a href={permanentLink} target="_blank" rel="noopener noreferrer">
            Permanent Link
          </a>
        </h3>
      )}

      <button className="m-4 " onClick={handleShowFiles}>
        Show Uploaded Files
      </button>
      
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((uploadedFile) => {
              const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
              });

              return (
                <li key={uploadedFile.Key}>
                  {uploadedFile.Key}{' '}
                  <a
                    href={s3.getSignedUrl('getObject', {
                      Bucket: BUCKET,
                      Key: uploadedFile.Key,
                      Expires: 3600,
                    })}
                    download
                  >
                    Download
                  </a>{' '}
                  <button onClick={() => handleDeleteFile(uploadedFile)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {allFiles.length > 0 && (
        <div>
          <h2>All Files:</h2>
          <ul>
            {allFiles.map((file) => {
              const s3 = new S3({
                accessKeyId: ACCESSKEY,
                secretAccessKey: SECRETKEY,
                endpoint: ENDPOINT,
              });

              return (
                <li key={file.Key}>
                  {file.Key}{' '}
                  <a
                    href={s3.getSignedUrl('getObject', {
                      Bucket: BUCKET,
                      Key: file.Key,
                      Expires: 3600,
                    })}
                    download
                  >
                    Download
                  </a>{' '}
                  <button onClick={() => handleDeleteFile(file)}>
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <div>
        <h2>Buckets:</h2>
        <ul>
          {buckets.map((bucket) => (
            <li key={bucket.Name}>{bucket.Name}</li>
          ))}
        </ul>
      </div>
    </div>
  );

}
//selected products
//validation
//is there address info?
//

