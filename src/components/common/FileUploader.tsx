import React, { useState, useRef } from 'react';
import { Button, IconButton, Grid, Paper } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import OutlinedErrorAlert from './ErrorAlert.tsx';
import IMG from '../../assets/avatar.png';

type FileUploadProps = {
   images: File[];
   setImages: (arg: File[]) => void;
   maxImagesUpload: number;
   defaultImage?: string | undefined;
   validator: (value: File[]) => string | false | undefined;
   onChange: (isValid: boolean) => void;
   onDelete: () => void;
};

const FileUploader = (props: FileUploadProps) => {
   const { maxImagesUpload, defaultImage, images, setImages, validator, onChange, onDelete } = props;
   const inputId = `file-uploader-${Math.random().toString(32).substring(2)}`;
   const defaultIMG = defaultImage ?? IMG;
   const [error, setError] = useState<string | false | undefined>(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [avatarSelected, setAvatarSelected] = useState<boolean>(false);

   const handleOnAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const files: File[] = Array.from(e.target.files);
      const errorMessage = validator(files);
      setError(errorMessage);
      onChange(!errorMessage);
      setAvatarSelected(true);
      setImages([...images, ...files]);
      e.target.value = '';
   };

   const handleOnRemoveImage = (index: number) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      const errorMessage = validator(newImages);
      setError(errorMessage);
      onChange(!errorMessage);
      onDelete();
   };

   const handleAvatarClick = () => {
      fileInputRef.current?.click();
   };

   return (
      <>
         <Grid container spacing={2}>
            {error && <OutlinedErrorAlert message={error} />}
            {images.length > 0 ? images.map((image, i) => (
               <Grid item xs={4} sm={3} md={2} key={i}>
                  <Paper
                     elevation={3}
                     sx={{
                        position: 'relative',
                        backgroundImage: `url(${URL.createObjectURL(image)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: 140,
                        '&:hover': {
                           opacity: 0.8,
                        },
                     }}
                  >
                     <IconButton
                        aria-label="delete image"
                        sx={{
                           position: 'absolute',
                           top: 5,
                           right: 5,
                           color: 'error.main',
                        }}
                        onClick={() => handleOnRemoveImage(i)}
                     >
                        <CancelIcon />
                     </IconButton>
                  </Paper>
               </Grid>
            )) : (
               !avatarSelected && (
                  <img
                     src={defaultIMG}
                     alt="Default Avatar"
                     style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain',
                        marginTop: 16,
                        cursor: 'pointer'
                     }}
                     onClick={handleAvatarClick}
                  />
               )
            )}
         </Grid>
         <label htmlFor={inputId}>
            <Button
               variant="contained"
               disabled={images.length >= maxImagesUpload}
               component="span"
               startIcon={<AddPhotoAlternateIcon />}
               sx={{
                  mt: 2,
                  backgroundColor: '#FF7F50',
                  color: 'black',
                  '&:hover': {
                     backgroundColor: '#FF7F50',
                     opacity: 0.8,
                  },
               }}
            >
               Upload image
            </Button>

            <input
               ref={fileInputRef}
               id={inputId}
               type="file"
               multiple
               accept="image/*,.png,.jpg,.jpeg,.gif"
               onChange={handleOnAddImage}
               style={{ display: 'none' }}
            />
         </label>
      </>
   );
};

export default FileUploader;
