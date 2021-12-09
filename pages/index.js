import { Backdrop, Button, Card, Container } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/index.module.css'
import goTo from '../utils/router'
import CloseIcon from '@mui/icons-material/Close';
import { getCatsAndSubs } from '../services/requests'
import { SUPPORT_SUBJECTS } from './home'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setStoreDetailsAction } from '../redux/actions/storeActions'

export default function Index(props) {
    const [showCats, setShowCats] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        const query = router.query
        // alert(JSON.stringify(query))
        if (query.phone && query.store) {
            dispatch(setStoreDetailsAction({
                name: query.name || '',
                store: query.store || '',
                phone: query.phone || '',
            }))
        }
    }, [])
    return (
        <Container maxWidth="md" >
            <Backdrop sx={
                { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }
            }
                open={showCats}
                onClick={
                    () => setShowCats(false)
                } >
                <Card className={styles.card} >
                    <div style={
                        {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }
                    } >
                        <div style={
                            {
                                fontWeight: '400',
                                fontSize: '1.2rem'
                            }
                        } > Select your Issue Type </div>
                        <CloseIcon />
                    </div>

                    <div className={styles.gridContainer} >
                        {
                            props.items ?
                                props.items.map(itm => (
                                    <ImageButton image={getImage(itm.name)}
                                        key={itm._id}
                                        onPress={
                                            () => goTo('/tickets/createTicket', {
                                                category: itm._id
                                            })
                                        }
                                        title={itm.name}
                                    />
                                )) : null

                        }
                    </div>

                </Card>
            </Backdrop >
            <Box sx={
                { bgcolor: '#fff', height: '100vh', padding: '20px 20px' }
            } >
                <h1 style={
                    {
                        textAlign: 'center',
                        fontWeight: '400'
                    }
                } > Support </h1>
                <ImageButton onPress={() => setShowCats(true)}
                    image={require('../assets/images/support.png')}
                    title={'Request a Callback'}
                />
                <ImageButton onPress={() => goTo('/home')
                }
                    image={require('../assets/images/faq.png')}
                    title={'Browse Frequently Asked Questions (FAQs)'}
                />
            </Box >
        </Container>
    )
}

const getImage = name => (SUPPORT_SUBJECTS.find(itm => itm.title == name)?.icon || SUPPORT_SUBJECTS[SUPPORT_SUBJECTS.length - 1].icon)


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

const ImageButton = ({ onPress, image, title }) => (
    <div className={styles.button}
        onClick={onPress}
        style={
            {
                padding: '10px',
                border: '2px solid #eee',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                margin: '5px 5px'
            }
        } >
        <div >
            <Image src={image}
                width={25}
                height={25}
            />
        </div >
        <div style={
            {
                marginLeft: '10px',
                fontWeight: '400',
                fontSize: '1.2rem'
            }
        } > {title} </div>
    </div >
)