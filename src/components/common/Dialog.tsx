import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const mainColor = '#FF7F50';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    '& .MuiDialogTitle-root': {
        backgroundColor: alpha(mainColor, 0.85),
        color: theme.palette.primary.contrastText,
    },
    '& .MuiPaper-root': {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
    }
}));

interface CustomizedDialogsProps {
    isOpen: boolean;
    message: string;
    setOpen: (arg: boolean) => void;
    navigate: string
}

export default function CustomizedDialogs(props: CustomizedDialogsProps) {
    const navigate = useNavigate();
    const handleClose = () => {
        props.setOpen(false);
        navigate(props.navigate)
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={props.isOpen}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Information
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[50],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    {props.message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} variant="contained" color="primary" sx={{ backgroundColor: mainColor }}>
                    Ok
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
