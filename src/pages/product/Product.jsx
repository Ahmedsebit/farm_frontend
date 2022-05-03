import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Button, TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from "react-hook-form";
import Collapse from '@mui/material/Collapse';
import './product.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Product() {

    
    const {id} = useParams()
    const [product, setProduct] = useState([])
    const [open, setOpen] = useState(false);
    const [open_notification, setOpenNotification] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { handleSubmit, control } = useForm();
    
    const saveOrder = (data) => {
        data.product_id = parseInt(id)
        data.quantity = parseFloat(data.quantity)
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('https://firstbodifarmbackend.herokuapp.com/api/farm_backend/v1/orders', requestOptions)
            .then(response => response.json())
            .then(data => data);
    }
    const onSubmit = (data: any) => {
        saveOrder(data)
        handleClose();
        setOpenNotification(true);
    }

    
    const fetchData = () => {
        fetch(`https://firstbodifarmbackend.herokuapp.com/api/farm_backend/v1/products/${id}`,)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setProduct(data)
          })
      }

      useEffect(() => {
        fetchData()
      }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open_notification}>
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenNotification(false);
                            }}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        >
                        Close me!
                        </Alert>
                    </Collapse>
                </Box>
            </Grid>
            <Grid item xs={6} md={6}>
                <div className="product-image-container">
                    <img className="product-image" src={'/images/'+product.image_url.split("jpg")[0]+'jpg'} alt="" />
                </div>
            </Grid>
            <Grid item xs={6} md={6}>
                <h2 className="product-details-name">{product.name}</h2>
                <p className="product-details-description">{product.description}</p>
                <p className="product-details-price">{product.price}</p>
                <Button variant="contained" onClick={handleOpen}>Order</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h2>Order</h2>
                        <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Controller
                                    name={"email"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField fullWidth onChange={onChange} value={value} label={"email"} required/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Controller
                                    name={"phonenumber"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField fullWidth onChange={onChange} value={value} label={"phonenumber"} required/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Controller
                                    name={"location"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField fullWidth onChange={onChange} value={value} label={"location"} required/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Controller
                                    name={"building"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField fullWidth onChange={onChange} value={value} label={"building"} required/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Controller
                                    name={"quantity"}
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <TextField onChange={onChange} value={value} label={"quantity"} required/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Box>
                </Modal>
            </Grid>
            
        </Grid>
    )
}
