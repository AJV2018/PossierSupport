import { Label } from '@mui/icons-material'
import { Backdrop, Button, Card, CircularProgress, Container, CssBaseline, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setLoadingAction } from '../../redux/actions/loaderActions'
import { openSnackBarAction } from '../../redux/actions/snackBarActions'
import { setStoreDetailsAction } from '../../redux/actions/storeActions'
import { getCatsAndSubs } from '../../services/requests'
import styles from '../../styles/createTicket.module.css'
const priorities = [
    {
        _id: 0,
        name: 'Urgent : Call within 15 mins'
    },
    {
        _id: 1,
        name: 'Medium : Call within 1 hour'
    },
    {
        _id: 2,
        name: 'Low : Call within 2 hours'
    },
]
export default function CreateTicket(props) {

    const router = useRouter()
    const storeDetails = useSelector(state => state.storeDetails)
    const [currentCat, setCurrentCat] = useState('')
    const [catSection, setCatSection] = useState([])

    const [email, setEmail] = useState({ value: '', error: '' })
    const [phone, setPhone] = useState({ value: '', error: '' })
    const [subject, setSubject] = useState({ value: '', error: '' })
    const [description, setDescription] = useState({ value: '', error: '' })
    const [storeName, setStoreName] = useState({ value: '', error: '' })

    const [currentPriority, setCurrentPriority] = useState(2)


    const dispatch = useDispatch()
    const setLoading = value => dispatch(setLoadingAction(value))

    useEffect(() => {
        console.log('STORE >>>', storeDetails)
        setEmail({ value: storeDetails.name, error: '' })
        setPhone({ value: storeDetails.phone, error: '' })
        setStoreName({ value: storeDetails.store, error: '' })
    }, [storeDetails])
    useEffect(() => {
        console.log('PROPS >>>>', props)
        setCatSection(props.items)
        const query = router.query || {}
        const catPresent = props.items?.find(itm => itm._id === query.category)
        if (catPresent) {
            setCurrentCat(catPresent._id)
        } else {
            setCurrentCat(props.items[0]._id)
        }
    }, [])


    const handleSubmit = () => {
        if (validate()) {
            setLoading(true)
            axios.post('/api/createTicket', {
                email: email.value,
                phone: phone.value,
                subject: subject.value,
                currentCat: catSection.find(itm => itm._id === currentCat),
                description: `
                Name : ${email.value},
                Store : ${storeName.value}
                ${description.value}
                `,
                priority: priorities.find(itm => itm._id === currentPriority)
            }).then(res => {
                console.log('RES >>>>', res.data)
                router.replace('/')
                dispatch(openSnackBarAction({
                    show: true,
                    message: "Ticket created successfully! We'll get in touch with you shortly"
                }))
            }).catch(err => alert(JSON.stringify(err.response.data))).finally(() => setLoading(false))
        }
    }

    const validate = () => {
        let err = false
        if (!email.value.length) {
            err = true
            setEmail({ ...email, error: 'Enter a valid email' })
        }
        if (!storeName.value.length) {
            err = true
            setStoreName({ ...storeName, error: 'Enter a valid Store Name' })
        }
        if (phone.value.length !== 10) {
            err = true
            setPhone({ ...phone, error: 'Enter a valid 10 digit mobile number' })
        }

        // if (subject.value.length < 5) {
        //     err = true
        //     setSubject({ ...subject, error: 'Subject must be atleast 5 letters' })
        // }

        if (description.value.length < 10) {
            err = true
            setDescription({ ...description, error: 'Description must be alteast 10 letters' })
        }

        return !err
    }

    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box sx={{ bgcolor: '#fff', height: '100vh', padding: '20px 20px' }}>
                    <Card style={{
                        padding: '0px 10px 10px 10px'
                    }}>
                        <h1 style={{
                            fontWeight: '400'
                        }}>Who will get the call?</h1>
                        <div className={styles.emailRow}>
                            <div
                                className={styles.emailBox}
                            >
                                <TextField
                                    error={email.error.length}
                                    helperText={email.error}
                                    value={email.value}
                                    onChange={e => setEmail({ value: e.target.value, error: '' })}
                                    variant={'outlined'}
                                    // style={{ marginRight: '10px' }}
                                    label='Name'
                                    fullWidth />
                            </div>
                            <div className={styles.emailBox1}>
                                <TextField
                                    type="number"
                                    pattern="[0-9]*"
                                    inputmode="numeric"
                                    error={phone.error.length}
                                    helperText={phone.error || "Please enter your registered phone number"}
                                    value={phone.value} onChange={e => (e.target.value === '' || (Number(e.target.value) && (e.target.value).trim().length < 11)) ? setPhone({ value: e.target.value.trim(), error: '' }) : null}
                                    // style={{ marginLeft: '10px' }}
                                    variant={'outlined'}
                                    label='Registered Phone Number'
                                    fullWidth />
                            </div>
                        </div>
                        <TextField
                            error={storeName.error.length}
                            helperText={storeName.error}
                            value={storeName.value}
                            onChange={e => setStoreName({ value: e.target.value, error: '' })}
                            variant={'outlined'}
                            style={{ marginTop: '10px' }}
                            label='Store'
                            fullWidth />

                        <FormControl style={{ marginTop: '20px' }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Issue</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentCat}
                                label="Issue"
                                onChange={e => setCurrentCat(e.target.value)}
                            >
                                {
                                    catSection.map(itm => (<MenuItem value={itm._id}>{itm.name}</MenuItem>))
                                }

                            </Select>
                        </FormControl>
                        {/* <FormControl style={{ marginTop: '20px' }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={currentPriority}
                                label="Select Priority"
                                onChange={e => setCurrentPriority(e.target.value)}
                            >
                                {
                                    priorities.map(itm => (<MenuItem value={itm._id}>{itm.name}</MenuItem>))
                                }

                            </Select>
                        </FormControl> */}
                        <div style={{
                            marginTop: '20px',
                            fontWeight: '600',
                            color: '#222'
                        }}>Select Priority</div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            {
                                priorities.map(itm => (
                                    <div
                                        onClick={() => setCurrentPriority(itm._id)}
                                        style={{
                                            background: currentPriority === itm._id ? '#3043F7' : '#fff',
                                            color: currentPriority === itm._id ? '#fff' : '#3043F7',
                                            margin: '10px 5px',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: currentPriority === itm._id ? '2px solid #3043F7' : '1px solid #3043F7',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            fontSize: '1rem'
                                        }}>
                                        {itm.name.replace('Call within', '')}
                                    </div>
                                ))
                            }
                        </div>

                        {/* <TextField error={subject.error.length} helperText={subject.error} value={subject.value} onChange={e => setSubject({ value: e.target.value, error: '' })} style={{ marginTop: '20px' }} variant={'outlined'} label='Subject' fullWidth /> */}

                        <TextField
                            error={description.error.length}
                            helperText={description.error}
                            value={description.value}
                            onChange={e => setDescription({ value: e.target.value, error: '' })}
                            style={{
                                marginTop: '20px',
                            }}
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                        // value={answer}
                        // onChange={e => setAnswer(e.target.value)}
                        />

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            // color={'#000'}
                            component="label"
                            style={{
                                marginTop: '20px',
                                backgroundColor: '#3043F7',
                                fontWeight: '400'
                            }}
                        >
                            Request Callback
                            {/* <input
                                type="file"
                                hidden
                            /> */}
                        </Button>
                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export async function getServerSideProps() {
    let finalProps = {}
    try {
        const response = await getCatsAndSubs()
        finalProps = {
            items: response.items,
            subCats: response.subCats
        }
    } catch (error) {
        finalProps = {
            err: error
        }
    }

    return {
        props: { ...finalProps }
    }


}


