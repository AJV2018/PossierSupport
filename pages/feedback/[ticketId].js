import { Button, Card, Container, Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import * as ratings from '../../assets/lotties/ratings.json'
import { setLoadingAction } from '../../redux/actions/loaderActions';
import { openSnackBarAction } from '../../redux/actions/snackBarActions';
export default function GenericFeedback(props) {
    const router = useRouter()
    const [cRating, setCRating] = useState(0)
    const [rSubmitted, setRSubmitted] = useState(false)
    const { ticketId } = router.query

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ratings,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const submitReview = () => {
        setLoading(true)
        setTimeout(() => {
            setRSubmitted(true)
            setLoading(false)
            showToast('Feedback submitted successfully')
        }, 2000)
    }

    const dispatch = useDispatch()

    const setLoading = value => dispatch(setLoadingAction(value))

    const showToast = msg => dispatch(openSnackBarAction({
        show: true,
        message: msg
    }))
    return (
        <Container maxWidth='md'>
            <Box sx={{ bgcolor: '#fff', height: '100vh', padding: '20px 20px' }}>
                <Card sx={{
                    textAlign: 'center',
                    borderTop: '5px solid',
                    borderImage: 'linear-gradient(to right, grey 10%, orange 10%,orange 20%,red 20%, red 30%,  grey 30%, grey 40%, orange 40%, orange 50%,red 50%, red 60%,teal 60%,teal 70%,orange 70%,orange 80%,red 80%, red 90%,  grey 90%, grey 100%) 5 0 0 0',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                    {
                        rSubmitted ?
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                minHeight: '270px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: 'red'
                            }}>
                                <h1 style={{
                                    fontWeight: '600',
                                    fontSize: '1.5rem',
                                }}>Thank you for submitting your valuable feedback</h1>
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                    // height={100}
                                    // width={100}
                                    />
                                </div>
                            </div>
                            :
                            <>
                                <div style={{
                                    margin: '1rem 0',
                                    fontWeight: '600',
                                    fontSize: '1.1rem'
                                }}>Leave us a review</div>
                                <div style={{
                                    marginBottom: '10px',
                                    fontWeight: '500',
                                    fontSize: '0.9rem',
                                    color: 'grey'
                                }}>Click the stars to rate us</div>

                                {/* <Typography component="legend">10 stars</Typography> */}
                                <Rating name="customized-10" onChange={(e, value) => setCRating(value)} defaultValue={cRating} value={cRating} max={10} size='large' />
                                <Button
                                    onClick={submitReview}
                                    variant='outlined' sx={{
                                        margin: '20px 0'
                                    }} >Submit</Button>
                            </>
                    }
                </Card>
            </Box>
        </Container >
    )
}

