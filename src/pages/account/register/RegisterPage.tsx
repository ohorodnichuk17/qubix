import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GenderInput from "../../../components/common/GenderInput.tsx";
import BirthdayInput from "../../../components/common/BirthdayInput.tsx"
import Container from '@mui/material/Container';
import InputGroup from "../../../components/common/InputGroup.tsx";
import {
   AvatarValidator,
   BirthdayValidator,
   ConfirmPasswordValidator,
   EmailValidator,
   FirstNameValidator, GenderValidator, LastNameValidator,
   PasswordValidator
} from "../../../validations/account/index.ts";
import { useRef, useState } from "react";
import { IUserRegister } from "../../../interfaces/account/index.ts";
import OutlinedErrorAlert from "../../../components/common/ErrorAlert.tsx";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../../../components/common/ErrorHandler.ts";
import FileUploader from "../../../components/common/FileUploader.tsx";
import { useTheme, useMediaQuery } from '@mui/material';
import IMG from '../../../assets/avatar.png';
import Logo from "../../../components/common/Logo.tsx"

export interface IUploadedFile {
   lastModified: number;
   lastModifiedDate: Date;
   name: string;
   originFileObj: File;
   percent: number;
   size: number;
   thumbUrl: string;
   type: string;
   uid: string;
}

interface FormData {
   email: string;
   password: string;
   confirmPassword: string;
   firstName: string;
   lastName: string;
   gender: string;
   birthday: Date | undefined;
   avatar: File | undefined;
}

export default function RealtorRegisterPage() {
   const navigate = useNavigate();

   const [formData] = useState<FormData>({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
      birthday: undefined,
      avatar: undefined
   });

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
   const [isFormValid, setIsFormValid] = useState(false);
   const formValid = useRef({
      email: false, password: false, confirmPassword: false, firstName: false,
      lastName: false, gender: false, birthday: false, avatar: false
   });
   const [images, setImages] = useState<File[]>([])

   const confirmPassValidator = (value: string): string | false | undefined => {
      return ConfirmPasswordValidator(password, value);
   };

   function handleChange() {
      setIsFormValid(Object.values(formValid.current).every(isValid => isValid));
      console.log("formValid.current", formValid.current)
      console.log("TestValid", Object.values(formValid.current).every(isValid => isValid))

   }

   const getDefaultAvatarFile = () => {
      return fetch(IMG)
         .then(response => response.blob())
         .then(blob => new File([blob], "avatar.png", { type: "image/png" }));
   };


   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const birthdayStr = data.get("birthday");
      let birthday: Date | null = null;

      if (typeof birthdayStr === 'string' && birthdayStr) {
         birthday = new Date(birthdayStr);
         if (isNaN(birthday.getTime())) {
            console.error("Invalid date");
            birthday = null;
         }
      }
      // Inside handleSubmit function
      let avatar: File | undefined;
      if (images.length > 0) {
         avatar = images[0];
      } else {
         avatar = await getDefaultAvatarFile();
      }

      if (
         Object.values(formValid.current).every(isValid => isValid) &&
         birthday
      ) {
         const model: IUserRegister = {
            email: data.get("email") as string,
            password: data.get("password") as string,
            confirmPassword: data.get("confirmPassword") as string,
            firstName: data.get("firstName") as string,
            lastName: data.get("lastName") as string,
            birthday: birthday,
            gender: data.get("gender") as string,
            avatar: avatar
         };

         try {
            const response = await fetch('api/Authentication/register', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(model)
            });

            if (response.ok) {
               navigate(`/authentication/register-information/${model.email}`);
            } else {
               throw new Error('Registration failed');
            }
         } catch (error) {
            setErrorMessage(ErrorHandler(error));
         }
      }

   };


   console.log("isFormValid", isFormValid)

   return (
      <Container component="main" maxWidth="md">
         <CssBaseline />
         {/*<Typography variant="body1" sx={{ color: 'black', mb: 2, textAlign: 'center', maxWidth: 300 }}>
            Where connections are made, and communities are built.
         </Typography>*/}
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               backgroundColor: '#f7f7f7',
               borderRadius: '8px',
               boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
               padding: '20px',
               margin: '20px 0',
               marginTop: '80px',
            }}
         >
            <Logo />

            {errorMessage && <OutlinedErrorAlert message={errorMessage} />}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }} onChange={handleChange}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <FileUploader
                        images={images}
                        setImages={setImages}
                        maxImagesUpload={1}
                        validator={AvatarValidator}
                        onChange={isValid => (formValid.current.avatar = isValid)}
                        onDelete={handleChange}
                     ></FileUploader>
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                     <InputGroup
                        label="First name"
                        field="firstName"
                        validator={FirstNameValidator}
                        onChange={isValid => (formValid.current.firstName = isValid)}
                     />
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                     <InputGroup
                        label="Last name"
                        field="lastName"
                        validator={LastNameValidator}
                        onChange={isValid => (formValid.current.lastName = isValid)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <InputGroup
                        label="Email"
                        field="email"
                        type="email"
                        validator={EmailValidator}
                        onChange={isValid => (formValid.current.email = isValid)}
                     />
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                     <InputGroup
                        label="Password"
                        field="password"
                        type="password"
                        validator={PasswordValidator}
                        onChange={isValid => (formValid.current.password = isValid)}
                        setIncomeValue={setPassword}
                     />
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                     <InputGroup
                        label="Confirm Password"
                        field="confirmPassword"
                        type="password"
                        validator={confirmPassValidator}
                        onChange={isValid => (formValid.current.confirmPassword = isValid)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <BirthdayInput
                        field="birthday"
                        validator={BirthdayValidator}
                        onChange={(isValid, value) => {
                           formValid.current.birthday = isValid;
                           if (isValid) {
                              formData.birthday = value ? new Date(value) : undefined;
                           }
                           handleChange();
                        }}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <GenderInput
                        field="gender"
                        validator={GenderValidator}
                        onChange={(isValid, value) => {
                           formValid.current.gender = isValid;
                           formData.gender = value;
                           handleChange();
                        }}
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isFormValid}
               >
                  Register
               </Button>
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link href="/authentication/login" variant="body2">
                        Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
}