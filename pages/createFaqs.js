import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import nProgress from 'nprogress'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Center from '../components/layouts/Center'
import { initFaqsAction } from '../redux/actions/faqActions'
import { addSubCategory, getCatsAndSubs } from '../services/requests'
import styles from '../styles/createFaqs.module.css'

export default function createFaqs(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [currentCat, setCurrentCat] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [catSection, setCatSection] = useState([])
    const [allSubCats, setAllSubCats] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('PROPS >>>>', props)
        setAllSubCats(props.subCats)
        setCatSection(props.items)
        setCurrentCat(props.items[0]?._id || '')
    }, [])

    const handleCatSelect = e => {
        setCurrentCat(e.target.value)
    }

    const onSubmit = () => {
        if (buttonDisabled) {
            return
        }
        if (!currentCat) {
            alert('Please select a Category!')
            return
        }
        if (question.length < 5) {
            alert('Question must be atleast 5 letters')
            return
        }
        if (answer.length < 10) {
            alert('Answwer must be atleast 10 letters')
            return
        }
        if (allSubCats.find(itm => (itm.name?.toLowerCase() == question.toLocaleLowerCase()) && currentCat == itm.parent)) {
            alert('Question already exist for this category')
            return
        }
        setButtonDisabled(true)
        nProgress.start()
        addSubCategory(question, currentCat, answer)
            .then(res => {
                toast.success('Question added Successfully!')
                setQuestion('')
                setAnswer('')
                getCatsAndSubs().then(res => {
                    dispatch(initFaqsAction({
                        catSection: res.items,
                        subCats: res.subCats
                    }))
                })
            }).catch(err => toast.error(err))
            .finally(() => {
                nProgress.done()
                setButtonDisabled(false)

            })

    }

    // if (!loggedIn) {
    //     return <LoginModal setLoggedIn={setLoggedIn} />
    // }
    return (
        <Center>
            <div style={{
                display: 'flex',
                flex: 1,
                padding: "0 20px",
                flexDirection: 'column'
            }}>
                <h2>Create FAQ</h2>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentCat}
                        label="Select Category"
                        onChange={handleCatSelect}
                    >
                        {
                            catSection.map(itm => (<MenuItem value={itm._id}>{itm.name}</MenuItem>))
                        }

                    </Select>
                </FormControl>

                <TextField
                    style={{
                        marginTop: '10px'
                    }}
                    id="outlined-basic"
                    label="Question"
                    variant="outlined"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                />

                <TextField
                    style={{
                        marginTop: '10px',
                        marginBlock: '10px'
                    }}
                    id="outlined-multiline-static"
                    label="Answer"
                    multiline
                    rows={4}
                    defaultValue="Enter the answer here"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                />

                <div
                    onClick={onSubmit}
                    className={styles.faqSubmitButton}
                    style={buttonDisabled ? {
                        backgroundColor: 'grey',
                    } : {}}
                >Submit</div>


            </div>
        </Center>
    )
}

const LoginModal = ({ setLoggedIn }) => {
    const [password, setPassword] = useState('')
    const [passErr, setPassErr] = useState('')
    const onSubmit = () => {
        if (password === 'Po$$2244') {
            setLoggedIn(true)
            return
        }
        setPassErr('Invalid credentials!')

    }
    return (
        <div className={styles.loginModal}>
            <div className={styles.passwordContainer}>
                <div>Enter Admin password</div>
                <input value={password} onChange={e => setPassword(e.target.value)} className={styles.passwordField} type='password' placeholder='Enter password here' />
                {passErr.length > 0 && <div style={{ color: 'red', fontWeight: '300' }}>{passErr}</div>}
                <div onClick={onSubmit} className={styles.submitButton}>Submit</div>
            </div>
        </div>
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
